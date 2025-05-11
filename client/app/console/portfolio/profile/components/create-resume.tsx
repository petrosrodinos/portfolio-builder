import React from "react";
import { Page, Text, View, Document, StyleSheet, Font, Link } from "@react-pdf/renderer";
import { getPortfolio } from "@/services/portfolio";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth";

// Register fonts
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#ffffff",
    fontFamily: "Roboto",
  },
  header: {
    marginBottom: 20,
    borderBottom: "1px solid #e0e0e0",
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  role: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 10,
    color: "#666666",
    marginBottom: 5,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333333",
  },
  item: {
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 10,
    color: "#666666",
    marginBottom: 2,
  },
  itemDescription: {
    fontSize: 10,
    color: "#444444",
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  skillItem: {
    fontSize: 10,
    backgroundColor: "#f0f0f0",
    padding: "2 5",
    borderRadius: 3,
  },
});

const CreateResume = () => {
  const { user_id } = useAuthStore();
  const { data: portfolio } = useQuery({
    queryKey: ["portfolio"],
    queryFn: () => getPortfolio(user_id),
    enabled: !!user_id,
  });

  return (
    <>
      {portfolio && (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.header}>
              <Text style={styles.name}>{portfolio.user.full_name}</Text>
              <Text style={styles.role}>{portfolio.role}</Text>
              <Text style={styles.contactInfo}>
                {portfolio.email} • {portfolio.phone} • {portfolio.address}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              {/* <Text style={styles.itemDescription}>{portfolio?.bio}</Text> */}
            </View>

            {/* <View style={styles.section}>
              <Text style={styles.sectionTitle}>Work Experience</Text>
              {portfolio.experiences.map((exp, index) => (
                <View key={index} style={styles.item}>
                  <Text style={styles.itemTitle}>{exp.title}</Text>
                  <Text style={styles.itemSubtitle}>
                    {exp.company} • {exp.location} • {exp.start} - {exp.finish || "Present"}
                  </Text>
                  <Text style={styles.itemDescription}>{exp.description}</Text>
                </View>
              ))}
            </View> */}

            {/* <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {portfolio.educations.map((edu, index) => (
                <View key={index} style={styles.item}>
                  <Text style={styles.itemTitle}>{edu.title}</Text>
                  <Text style={styles.itemSubtitle}>
                    {edu.institution} • {edu.start} - {edu.finish}
                  </Text>
                  {edu.link && (
                    <Link src={edu.link} style={styles.itemDescription}>
                      View Certificate
                    </Link>
                  )}
                </View>
              ))}
            </View> */}

            {/* <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.skillsContainer}>
                {portfolio.skills.map((skill, index) => (
                  <Text key={index} style={styles.skillItem}>
                    {skill.title} ({skill.level})
                  </Text>
                ))}
              </View>
            </View> */}

            {/* <View style={styles.section}>
              <Text style={styles.sectionTitle}>Languages</Text>
              <View style={styles.skillsContainer}>
                {portfolio.languages.map((lang, index) => (
                  <Text key={index} style={styles.skillItem}>
                    {lang.title} ({lang.level})
                  </Text>
                ))}
              </View>
            </View> */}
          </Page>
        </Document>
      )}
    </>
  );
};

export default CreateResume;
