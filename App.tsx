import React, { useState, useEffect, useRef, useMemo, FormEvent, ChangeEvent } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { 
  Terminal, Code, Award, GraduationCap, MapPin, Mail, Phone, 
  BookOpen, Brain, Clock, Users, ArrowUp, Menu, X, ExternalLink, 
  Cpu, Eye, Layers, Compass, Zap, CheckCircle2, ChevronRight, Github, 
  Facebook, Instagram, Linkedin, Send, Copy, Maximize2, Minimize2, 
  MessageSquare, Calendar, ChevronDown, Play, Check, FileCode, GitBranch, 
  FileText, Sliders, Info, Heart, Twitter, Sparkles, 
  ShieldCheck, Trophy, Image as ImageIcon, Download, ZoomIn
} from "lucide-react";
interface AboutCard {
  id: string;
  title: string;
  category: "personal" | "education" | "community" | "skills";
  description: string;
  color: "coral" | "blue" | "green" | "amber";
  iconName: string;
  badge: string;
}

const aboutCardsData: AboutCard[] = [
  {
    id: "intro",
    title: "Introduction",
    category: "personal",
    description: "I’m a software developer building modern web applications while expanding into AI, with a focus on writing clean, reliable, and maintainable code.",
    color: "coral",
    iconName: "Compass",
    badge: "Personal Bio"
  },
  {
    id: "edu",
    title: "Educational Background",
    category: "education",
    description: "Currently pursuing a BSc.CSIT degree at Asian College of Management and Technology. Graduated high school from National Institute of Science and Technology (NIST) in 2024 (Computer Science) and completed SEE at Tarun Ma.Vi in 2022.",
    color: "blue",
    iconName: "GraduationCap",
    badge: "Academic Track"
  },
  {
    id: "focus",
    title: "Current Focus",
    category: "skills",
    description: "Currently focused on modern web development, building full-stack applications, and strengthening my skills with React, TypeScript, and Node.js while exploring AI.",
    color: "green",
    iconName: "Code",
    badge: "Development Focus"
  },
  {
    id: "future",
    title: "Future Plans",
    category: "education",
    description: "Aiming to deep-dive into advanced software architectures, mobile application development, and computational machine learning models for AI while pursuing my bachelor's in CSIT.",
    color: "amber",
    iconName: "Zap",
    badge: "Vision 2026+"
  },
  {
    id: "rep",
    title: "College Representative",
    category: "community",
    description: "Honored to serve as the College Representative at Code for Change for the 2025/2026 tenure, coordinating student tech initiatives and organizing peer developer meetups.",
    color: "coral",
    iconName: "Award",
    badge: "Leadership Node"
  },
  {
    id: "passion",
    title: "Passion for Learning",
    category: "personal",
    description: "Possess a deep-rooted passion for learning about new technologies and trends. Committed to maintaining a lifelong learning mindset in a fast-paced, hyper-evolving technology environment.",
    color: "blue",
    iconName: "BookOpen",
    badge: "Learning Path"
  },
  {
    id: "problem",
    title: "Problem Solving",
    category: "skills",
    description: "Approach algorithmic and design challenges by breaking complex tasks down into isolated, manageable parts. Driven to optimize performance, clean workflows, and write readable code.",
    color: "green",
    iconName: "Brain",
    badge: "Tactical Execution"
  }
];
interface Skill {
  name: string;
  status: string;
  tag: string;
  rating: number; // 1-5 signal lights
  category: "frontend" | "backend" | "seo_management" | "core";
  description: string;
}

const skillsData: Skill[] = [
  { name: "HTML & CSS", status: "Production Ready", tag: "Responsive & Flex/Grid", rating: 5, category: "frontend", description: "Building structured, responsive, and visually consistent web interfaces using semantic HTML and modern CSS." },
  { name: "JavaScript", status: "Core Stack", tag: "DOM & Async API", rating: 4, category: "frontend", description: "Adding interactive functionality, dynamic behavior, and responsive user experiences to web applications." },
  { name: "MySQL Database", status: "Production Ready", tag: "Relational Schema", rating: 4, category: "backend", description: "Designing, querying, and managing structured data using SQL for efficient and reliable database operations.(learning)" },
  { name: "PHP Scripting", status: "Production Ready", tag: "Procedural Engine", rating: 4, category: "backend", description: "Server-side page processing, form handling, procedural query architectures, and safe database connections." },
  { name: "WordPress Design", status: "Daily Driver", tag: "Custom CMS Build", rating: 5, category: "seo_management", description: "Custom site building, plugin management, child theme modification, and client portfolio templates." },
  { name: "Yoast SEO Optimization", status: "Specialist", tag: "Schema & Indexing", rating: 5, category: "seo_management", description: "Meta-tag structures, keyword density analyzer, clean schema markup, and dynamic crawl indexing." },
  { name: "Content Writing", status: "Specialist", tag: "High-Reach Copy", rating: 5, category: "seo_management", description: "High-reach SEO optimization, structured copy, blog writing, and engaging, target-centered narratives." },
  { name: "Graphic Designing", status: "Specialist", tag: "UI & Brand Assets", rating: 4, category: "seo_management", description: "Visual vector design, UI layouts, color harmony mapping, and promotional banner graphics." },
  { name: "Social Media Management", status: "High Velocity", tag: "Audience & Campaign", rating: 5, category: "seo_management", description: "Account strategy, brand scheduling, reach analysis, and student engagement campaigns." },
  { name: "Communication & Pitching", status: "Core Strength", tag: "Technical Briefs", rating: 5, category: "core", description: "Explaining technical workflows, presenting project briefs, and hosting local developer bootcamps." },
  { name: "Teamwork & Synergy", status: "Core Strength", tag: "Community Lead", rating: 5, category: "core", description: "Collaborating in multi-functional squads, mentoring peers, and organizing community tech sprints." },
  { name: "Time Management", status: "Core Strength", tag: "CSIT & Dev Balance", rating: 5, category: "core", description: "Balancing active BSc.CSIT academic coursework with freelance development tasks and Code for Change roles." }
];
interface Project {
  id: string;
  name: string;
  description: string;
  category: "web" | "c" | "ai" | "py";
  tags: string[];
  githubUrl: string;
  gradientFrom: string;
  gradientTo: string;
  filename: string;
  codeSnippet: string;
  highlights: string[];
}

const projectsData: Project[] = [
  {
    id: "crud",
    name: "CRUD Operations App",
    description: "A complete database administration interface designed to handle full operational cycles. Integrates safe PHP script pipelines with query engines and client-side JS data validation modules.",
    category: "web",
    tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    githubUrl: "https://github.com/Sudin-Neupane/CRUD-",
    gradientFrom: "from-[#ff6b6b]/20",
    gradientTo: "to-[#ff8e53]/10",
    filename: "crud_workflow.php",
    highlights: [
      "Procedural SQL query binding",
      "Dynamic data-grid rendering",
      "Sanitized client-input verification"
    ],
       codeSnippet: `
    <?php
declare(strict_types=1);

require_once __DIR__ . '/config/database.php';

$action = $_POST['action'] ?? $_GET['action'] ?? 'read';

function clean(string $value): string {
    return trim(htmlspecialchars($value, ENT_QUOTES, 'UTF-8'));
}

try {

    switch ($action) {

        // CREATE
        case 'create':
            $name    = clean($_POST['name'] ?? '');
            $email   = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
            $message = clean($_POST['message'] ?? '');

            if (!$name || !$email) {
                throw new InvalidArgumentException('Valid name and email required.');
            }

            $stmt = $pdo->prepare(
                "INSERT INTO users_records (name, email, message)
                 VALUES (:name, :email, :message)"
            );

            $stmt->execute([
                ':name'    => $name,
                ':email'   => $email,
                ':message' => $message
            ]);

            respond(201, 'Record created successfully.');
            break;


        // UPDATE
        case 'update':
            $stmt = $pdo->prepare(
                "UPDATE users_records
                 SET name = :name,
                     email = :email,
                     message = :message
                 WHERE id = :id"
            );

            $stmt->execute([
                ':id'      => (int) $_POST['id'],
                ':name'    => clean($_POST['name']),
                ':email'   => $_POST['email'],
                ':message' => clean($_POST['message'])
            ]);

            respond(200, 'Record updated successfully.');
            break;


        // DELETE
        case 'delete':
            $stmt = $pdo->prepare(
                "DELETE FROM users_records WHERE id = :id"
            );

            $stmt->execute([
                ':id' => (int) $_POST['id']
            ]);

            respond(200, 'Record deleted successfully.');
            break;


        // READ
        default:
            $stmt = $pdo->query(
                "SELECT id, name, email, message, created_at
                 FROM users_records
                 ORDER BY created_at DESC"
            );

            echo json_encode([
                'success' => true,
                'records' => $stmt->fetchAll(PDO::FETCH_ASSOC)
            ]);
    }

} catch (Throwable $error) {

    respond(400, $error->getMessage());
}


function respond(int $status, string $message): void {

    http_response_code($status);

    echo json_encode([
        'success' => $status < 400,
        'message' => $message
    ]);
}
?>

`
 },
  {
    id: "simple_site",
    name: "Simple Website",
    description: "A comprehensive web design structure crafted entirely with native CSS flex grids. Demonstrates responsive frameworks and smooth transform layouts without any external styling libraries.",
    category: "web",
    tags: ["HTML", "CSS", "Vanilla JS"],
    githubUrl: "https://github.com/Sudin-Neupane",
    gradientFrom: "from-[#64b5f6]/20",
    gradientTo: "to-[#4fc3f7]/10",
    filename: "layout_core.css",
    highlights: [
      "100% native grid layout matrices",
      "Custom viewport-responsive scale formulas",
      "High-performance CSS transform animations"
    ],
    codeSnippet: `
    // TypeScript / React — Frontend
const ProjectCard = ({ title, stack }: ProjectProps) => (
    <article className="project">
        <h2>{title}</h2>
        <p>{stack.join(" • ")}</p>
    </article>
);


// Node.js — API
app.get("/api/projects", async (req, res) => {
    const projects = await db.query(
        "SELECT * FROM projects ORDER BY created_at DESC"
    );

    res.json(projects.rows);
});


# Python — AI / Backend Service
def analyze_project(description: str):
    return {
        "summary": generate_summary(description),
        "status": "processed"
    }


-- PostgreSQL
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(120) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);


# Docker
FROM node:22-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]`
  },

   {
    id: "hospital",
    name: "Hospital Management System",
    description: "A low-level system automation tool coded in structured C. Uses safe file descriptors to catalog logs, patient medical charts, billing sheets, and doctor schedules.",
    category: "c",
    tags: ["C Language", "File I/O", "Data Structures"],
    githubUrl: "https://github.com/Sudin-Neupane/Hospital-Management-System",
    gradientFrom: "from-[#ffb74d]/20",
    gradientTo: "to-[#ffa726]/10",
    filename: "hospital_core.c",
    highlights: [
      "Persistent binary file stream records",
      "Algorithmic search and sorting indexes",
      "Strict data alignment and pointer structures"
    ],
    codeSnippet: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct PatientRecord {
    int patientID;
    char name[60];
    char diagnosis[100];
    int roomAllocation;
    float billingSum;
};

void registerPatient() {
    FILE *filePointer;
    struct PatientRecord record;
    
    filePointer = fopen("hospital_data.bin", "ab");
    if(filePointer == NULL) {
        printf("Error: File descriptors failed to launch.\\n");
        return;
    }
    
    printf("Enter Patient ID: ");
    scanf("%d", &record.patientID);
    getchar(); // Clear terminal buffer
    
    printf("Enter Full Name: ");
    fgets(record.name, sizeof(record.name), stdin);
    record.name[strcspn(record.name, "\\n")] = 0; // Strip newline
    
    printf("Enter Diagnosis: ");
    fgets(record.diagnosis, sizeof(record.diagnosis), stdin);
    record.diagnosis[strcspn(record.diagnosis, "\\n")] = 0;
    
    printf("Allocate Room Number: ");
    scanf("%d", &record.roomAllocation);
    
    printf("Calculate Billing: ");
    scanf("%f", &record.billingSum);
    
    fwrite(&record, sizeof(struct PatientRecord), 1, filePointer);
    fclose(filePointer);
    printf("Patient registry compiled successfully.\\n");
}`
  },
  