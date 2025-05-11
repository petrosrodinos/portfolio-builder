// deno-lint-ignore-file no-explicit-any
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js";
import { SkillOptions } from "../../utils/data.ts";

Deno.serve(async (req) => {
  const request = await req.json();

  const { prompt, user_id, resume } = request;

  const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${Deno.env.get("DEEPSEEK_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [{ role: "user", content: prompt }],
      response_format: {
        type: "json_object",
      },
    }),
  });

  const result = await response.json();

  const content = result?.choices?.[0]?.message?.content || null;

  const jsonResponse = content?.replace(/```(?:json)?\n?|```/g, "");

  const payload = JSON.parse(jsonResponse);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { error: profileError } = await supabase
    .from("profiles")
    .insert({
      user_id: user_id,
      email: payload.profile?.email,
      phone: payload.profile?.phone,
      address: payload.profile?.address,
      bio: payload.profile?.bio,
      role: payload.profile?.role,
      years_of_experience: payload.profile?.years_of_experience,
      resume: resume,
    });

  if (profileError) {
    throw profileError;
  }

  const totalExperiences = [
    ...payload.experiences,
    ...payload.projects,
    ...payload.educations,
  ];

  const experiences = totalExperiences.map((experience: any) => ({
    user_id: user_id,
    title: experience?.title,
    description: experience?.description,
    company: experience?.company,
    location: experience?.location,
    start: experience?.start,
    finish: experience?.finish,
    link: experience?.link,
    institution: experience?.institution,
    type: experience?.type,
    degree_type: experience?.degree_type,
  }));

  const { error } = await supabase
    .from("experiences")
    .insert(experiences);

  if (error) {
    console.error(error);
  }

  const totalSkills = [
    ...payload.links,
    ...payload.languages,
    ...payload.skills,
  ];

  const skills = totalSkills.map((skill: any) => {
    let title = skill?.title;
    if (skill.type === "skill") {
      const match = SkillOptions.find((s: any) =>
        skill.title.toLowerCase().includes(s.value)
      )?.value;
      if (match) {
        title = match;
      }
    }
    return {
      user_id: user_id,
      title: title,
      link: skill?.link,
      type: skill?.type,
      level: skill?.level,
    };
  });

  const { error: skillsError } = await supabase
    .from("skills")
    .insert(skills);

  if (skillsError) {
    console.error(skillsError);
  }

  return new Response(JSON.stringify({ content: payload }), {
    headers: { "Content-Type": "application/json" },
  });
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/ask-ai' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
