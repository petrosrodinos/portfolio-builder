import { supabase } from "../../lib/supabase";

export async function POST(request: Request) {
    const body = await request.json();
    const { email, password } = body;

    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })


        if (data && data.user) {
            return new Response(JSON.stringify(data), {
                status: 201,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (error) {
            return new Response(JSON.stringify(error), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Something went wrong' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return


}