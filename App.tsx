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
  {
    id: "c_repo",
    name: "C Programming Repository",
    description: "An extensive academic index showcasing complex algorithmic problem-solving, dynamic memory structures, custom utility libraries, and foundational CSIT data structures.",
    category: "c",
    tags: ["C Language", "Algorithms", "Pointers", "CSIT Core"],
    githubUrl: "https://github.com/Sudin-Neupane/C-Programming",
    gradientFrom: "from-[#81c784]/20",
    gradientTo: "to-[#66bb6a]/10",
    filename: "algorithms_demo.c",
    highlights: [
      "Dynamic memory allocating algorithms",
      "Recursions and custom pointer matrices",
      "Foundational sorting and list configurations"
    ],
    codeSnippet: `#include <stdio.h>
#include <stdlib.h>

// Dynamic array memory allocation & recursive search demonstration
int linearSearchRecursive(int *array, int size, int index, int target) {
    if(index >= size) {
        return -1; // Target not located
    }
    if(array[index] == target) {
        return index; // Target isolated
    }
    return linearSearchRecursive(array, size, index + 1, target);
}

int main() {
    int *dynamicArray, size, targetElement;
    printf("Enter size of dynamic dataset: ");
    scanf("%d", &size);
    
    dynamicArray = (int*)malloc(size * sizeof(int));
    if(dynamicArray == NULL) {
        printf("Dynamic allocation failed.\\n");
        return 1;
    }
    
    for(int i = 0; i < size; i++) {
        printf("Record value for node [%d]: ", i);
        scanf("%d", &dynamicArray[i]);
    }
    
    printf("Enter value to locate: ");
    scanf("%d", &targetElement);
    
    int resultIndex = linearSearchRecursive(dynamicArray, size, 0, targetElement);
    if(resultIndex != -1) {
        printf("Node located safely at index slot: %d\\n", resultIndex);
    } else {
        printf("Element not detected in database array.\\n");
    }
    
    free(dynamicArray);
    return 0;
}`
  },
  {
    id: "gesture",
    name: "Finger Gesture Control",
    description: "An interactive computer vision control system mapping coordinate structures of skeletal fingers into computer commands. Powered by OpenCV and neural hand nodes.",
    category: "ai",
    tags: ["Python", "OpenCV", "MediaPipe", "Computer Vision"],
    githubUrl: "https://github.com/Sudin-Neupane/fingergestures",
    gradientFrom: "from-[#a78bfa]/20",
    gradientTo: "to-[#8b5cf6]/10",
    filename: "gesture_controller.py",
    highlights: [
      "Skeletal keypoints coordinate tracking",
      "Dynamic gesture mapping threshold calculations",
      "Real-time low-latency video thread pipeline"
    ],
    codeSnippet: `# Interactive OpenCV & MediaPipe Gesture Controller Pipeline
import cv2
import mediapipe as mp
import numpy as np

class HandSkeletonTracker:
    def __init__(self):
        self.mp_hands = mp.solutions.hands
        self.hands = self.mp_hands.Hands(
            max_num_hands=1,
            min_detection_confidence=0.75,
            min_tracking_confidence=0.75
        )
        self.mp_draw = mp.solutions.drawing_utils

    def process_camera_frame(self, frame):
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = self.hands.process(rgb_frame)
        gesture_detected = "Scanning..."
        
        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                self.mp_draw.draw_landmarks(frame, hand_landmarks, self.mp_hands.HAND_CONNECTIONS)
                
                # Check coordinates for thumb & index fingertips
                thumb_tip = hand_landmarks.landmark[4]
                index_tip = hand_landmarks.landmark[8]
                
                # Dynamic spatial distance formula
                distance = np.sqrt((thumb_tip.x - index_tip.x)**2 + (thumb_tip.y - index_tip.y)**2)
                if distance < 0.05:
                    gesture_detected = "ACTION: ACTIVE PINCH (CLICK Triggered)"
                else:
                    gesture_detected = "STATUS: TRACKING HAND NODES"
                    
        return frame, gesture_detected`
  },
  {
    id: "recreate",
    name: "Recreate Pages",
    description: "A design catalog focusing on pixel-perfect template replication of top-tier websites. Serves as a deep study in grid alignment, fluid typography, and responsive styles.",
    category: "web",
    tags: ["HTML", "CSS", "Responsive Design"],
    githubUrl: "https://github.com/Sudin-Neupane/Recreate-pages",
    gradientFrom: "from-[#14b8a6]/20",
    gradientTo: "to-[#0d9488]/10",
    filename: "responsive_grid.html",
    highlights: [
      "High-contrast visual design structures",
      "Custom screen-ratio breakpoint setups",
      "Pixel-perfect media scale configurations"
    ],
    codeSnippet: `<!-- High Fidelity Responsive Grid Scaffold -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Aesthetic Scaffold Replication</title>
  <style>
    .showcase-stage {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 1.5rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    @media (max-width: 1024px) {
      .showcase-stage {
        grid-template-columns: repeat(8, 1fr);
      }
    }
    
    @media (max-width: 640px) {
      .showcase-stage {
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
      }
    }
  </style>
</head>
<body>
  <div class="showcase-stage">
    <!-- Recreated modules go here -->
  </div>
</body>
</html>`
  },
  {
    id: "learn_py",
    name: "Learning Python System",
    description: "A catalog of OOP architecture sandboxes, logic processors, directory sorters, and standard mathematical algorithm scripts designed for high performance.",
    category: "py",
    tags: ["Python", "Object-Oriented", "Data Pipelines"],
    githubUrl: "https://github.com/Sudin-Neupane/Python--Programming",
    gradientFrom: "from-[#4ade80]/20",
    gradientTo: "to-[#22c55e]/10",
    filename: "oop_data_sorter.py",
    highlights: [
      "Standard recursive list processing",
      "Error exception handlers and data logs",
      "Object-oriented design model schemas"
    ],
    codeSnippet: `# OOP Data Sorter Pipeline
import os
import json

class DatasetOptimizer:
    def __init__(self, target_directory):
        self.directory = target_directory
        self.logs = []

    def load_and_evaluate(self):
        try:
            if not os.path.exists(self.directory):
                raise FileNotFoundError(f"Target path {self.directory} is unreachable.")
                
            file_array = os.listdir(self.directory)
            # Filter standard JSON configurations using list comprehension
            json_files = [f for f in file_array if f.endswith('.json')]
            self.logs.append(f"Located {len(json_files)} configuration datasets.")
            return json_files
        except Exception as error:
            self.logs.append(f"CRITICAL ERROR: {str(error)}")
            return []

# Execute pipeline sandbox
if __name__ == "__main__":
    sorter = DatasetOptimizer("./data_sandbox")
    results = sorter.load_and_evaluate()
    print(f"Operational logs: {sorter.logs}")`
  }
];

interface TimelineMilestone {
  year: string;
  title: string;
  institution: string;
  description: string;
  iconType: "edu" | "leadership" | "work";
  tags: string[];
}

const timelineData: TimelineMilestone[] = [
  {
    year: "2024 - Present",
    title: "BSc. Computer Science & Information Technology",
    institution: "Asian College of Management and Technology",
    description: "Deepening theoretical and practical foundations in operating systems, algorithms, database management systems, structures, and modern program compiler fundamentals.",
    iconType: "edu",
    tags: ["BSc.CSIT", "University Student", "Kathmandu"]
  },
   {
    year: "2024",
    title: "High School Graduation (+2 Computer Science)",
    institution: "National Institute of Science and Technology (NIST)",
    description: "Completed rigorous high-school stream focused on computational logic, core programming algorithms, database basics, and structured systems development.",
    iconType: "edu",
    tags: ["NIST", "High School Computer Science", "Graduated"]
  },
  {
    year: "2025 - 2026",
    title: "College Representative",
    institution: "Code for Change Nepal",
    description: "Elected as official College representative for the 2025/2026 tenure. Actively bridging tech students across Colleges, coordinating specialized workshops, and organizing local bootcamps.",
    iconType: "leadership",
    tags: ["Leadership", "Tech Networking", "Event Coordination"]
  },
     {
    year: "2026",
    title: "AsianHack 2026 : Professionalism Award",
    institution: "Team PRIMORDIALS",
    description: "Participated in AsianHack 2026 with team 'PRIMORDIALS' and developed 'CivicFlow' : a full-stack civic tech web application that earned the prestigious Professionalism Award for code architecture and engineering discipline.",
    iconType: "leadership",
    tags: ["AsianHack 2026", "PRIMORDIALS", "CivicFlow", "Professionalism Award", "Hackathon"]
  },
  
      {
    year: "2026",
    title: "Codefest 2026 Provincial Phase Organizer",
    institution: "Technology Team // Codefest 2026",
    description: "Organized Codefest 2026 Provincial Phase as a core member of the Technology Team, coordinating platform infrastructure, hackathon workflows, and developer event operations.",
    iconType: "leadership",
    tags: ["Codefest 2026", "Tech Team", "Provincial Phase", "Event Organizer"]
  },
    {
    year: "2026",
    title: "111 Days of Learning Challenge (Certified)",
    institution: "Continuous Software Engineering Sprints",
    description: "Successfully completed the intensive 111 Days of Learning challenge, publishing daily technical deep dives and code logs on LinkedIn, and earned verified completion certification.",
    iconType: "leadership",
    tags: ["111 Days Challenge", "LinkedIn Certified", "Continuous Learning", "Full-Stack Mastery"]
  },
 
];
// Mock QA responses for our interactive chatbot
const chatbotQA = [
  {
    question: "Are you available for internships or freelance work?",
    answer: "I’m currently open to internships, freelance projects, and meaningful collaborations where I can contribute to real development work, learn from experienced teams, and keep growing as a developer. I’m especially interested in web development, React, backend integration, and software projects with practical impact. You can reach me through LinkedIn or the contact section of my portfolio"
  },
  {
    question: "What is your primary programming stack of choice?",
    answer: "Currently, I specialize in web frontend engineering using modern React, TypeScript, and Tailwind CSS, coupled with high-fidelity UI layout replication. For backend systems and database logic, I write clean PHP with MySQL databases, and I have robust academic foundations in low-level procedural C and Python."
  },
  {
    question: "What role do you play in Code for Change ",
    answer: "As the official College Representative for Asian College for the 2025/2026 tenure, I act as the central communication node. I represent our student developer community, establish inter-campus bridges, coordinate technical workshops, and host local programming bootcamps to foster tech awareness."
  },
  {
    question: "How do you handle complex problem-solving?",
    answer: "I follow a clean engineering lifecycle: 1. Deconstruct complex architectures into isolated modular chunks. 2. Establish robust data structures (procedural or relational). 3. Write self-documenting code with precise safety checks. 4. Run profiling and continuous verification loops to optimize execution paths."
  },
  {
    question: "What is your academic focus in BSc.CSIT?",
    answer: "I maintain peak focus on my BSc.CSIT curriculum at Asian College of Management and Science. My core focus centers on Discrete Structures, Database Management Systems (DBMS), Operating System kernels, Object-Oriented Programming (OOP) in C++/Python, and Analysis of Algorithms."
  },
  {
    question: "Tell me about your Computer Vision project.",
    answer: "My Finger Gesture Control project is a Python application powered by OpenCV and MediaPipe. It tracks real-time skeletal keypoints of fingertips in video frames, calculating spatial distances between the thumb and index finger to map dynamic gestures directly into desktop operating commands (e.g., triggering mouse clicks)."
  }
];
// Robust smart fallback answer generator for the chatbot and terminal nodes
const getSmartFallbackAnswer = (rawQuery: string): string => {
  const q = rawQuery.toLowerCase().trim();

  // 1. Direct Q&A match (fuzzy match)
  const matched = chatbotQA.find(
    qa => qa.question.toLowerCase().includes(q) || q.includes(qa.question.toLowerCase())
  );
  if (matched) {
    return matched.answer;
  }

  // 2. Who is Sudin / Identity / Who are you / Creator
  if (
    q.includes("who is sudin") ||
    q.includes("who is he") ||
    q.includes("about him") ||
    q.includes("tell me about him") ||
    q.includes("sudin neupane") ||
    (q.includes("who") && q.includes("sudin"))
  ) {
    return "Sudin Neupane is a highly talented 20-year-old BSc.CSIT student, developer, and tech community leader from Kathmandu, Nepal. He is the official College Representative for Code for Change  (2025/2026) and specializes in building high-fidelity React, TypeScript, PHP, and Python systems.";
  }
  if (
    q.includes("who are you") ||
    q.includes("what are you") ||
    q.includes("your identity") ||
    q.includes("yourself") ||
    q.includes("who is you")
  ) {
    return "I am Sudin AI — the digital twin and interactive portfolio assistant of Sudin Neupane. I can answer any general coding question, write/debug scripts, or provide details about Sudin's academic and technical milestones!";
  }
    if (
    q.includes("how were you made") ||
    q.includes("how did you made") ||
    q.includes("who made you") ||
    q.includes("who built you") ||
    q.includes("who created you") ||
    q.includes("creator") ||
    q.includes("developer")
  ) {
    return "I was designed and engineered by Sudin Neupane himself using a full-stack React, TypeScript, and Express architecture, powered securely by Google's Gemini LLM.";
  }
  
  // 3. Location / Address
  if (
    q.includes("live") ||
    q.includes("location") ||
    q.includes("address") ||
    q.includes("where is he") ||
    q.includes("where do you live") ||
    q.includes("kathmandu") ||
    q.includes("nepal")
  ) {
    return "Sudin resides in Raniban, Nagarjun, Kathmandu, Nepal.";
  }
  // 4. Age
  if (
    q.includes("age") ||
    q.includes("how old") ||
    q.includes("birth") ||
    q.includes("years old")
  ) {
    return "Sudin is 20 years old, born in Nepal.";
  }

  // 5. Contact / Email / Socials
  if (
    q.includes("email") ||
    q.includes("gmail") ||
    q.includes("contact") ||
    q.includes("phone") ||
    q.includes("reach") ||
    q.includes("social") ||
    q.includes("github") ||
    q.includes("linkedin") ||
    q.includes("facebook")
  ) {
    return "You can contact Sudin Neupane directly via email at sudinneupane519@gmail.com, or explore his repositories and social links featured throughout this interactive dashboard!";
  }
  // 6. Education / College / Academic
  if (
    q.includes("college") ||
    q.includes("study") ||
    q.includes("education") ||
    q.includes("university") ||
    q.includes("school") ||
    q.includes("csit") ||
    q.includes("bsc") ||
    q.includes("nist") ||
    q.includes("tarun") ||
    q.includes("degree") ||
    q.includes("academic")
  ) {
    return "Sudin is pursuing his BSc.CSIT (Computer Science and Information Technology) degree at Asian College of Management and Science, Kathmandu. He graduated with honors in +2 Computer Science from NIST (National Institute of Science and Technology) in 2024, and completed SEE at Tarun Ma.Vi in 2022.";
  }
    // 7. Code for Change / CFC
  if (
    q.includes("code for change") ||
    q.includes("cfc") ||
    q.includes("representative") ||
    q.includes("community") ||
    q.includes("leader")
  ) {
    return "Sudin Neupane serves as the official College Representative for 'Code for Change Nepal' (2025/2026). In this role, he leads local IT bootcamps, runs programming workshops, and fosters student-developer peer networks in Kathmandu.";
  }
  
  // 8. Projects / Finger Gesture / Python / OpenCV / MediaPipe
  if (
    q.includes("project") ||
    q.includes("build") ||
    q.includes("make") ||
    q.includes("create") ||
    q.includes("gesture") ||
    q.includes("finger") ||
    q.includes("cv") ||
    q.includes("vision") ||
    q.includes("opencv") ||
    q.includes("mediapipe") ||
    q.includes("python")
  ) {
    return "Sudin's key projects are:\n1. **Finger Gesture Control System** (Python, OpenCV, MediaPipe for virtual desktop mouse controls)\n2. **Hospital Management System** (Structured C Programming Patient directory)\n3. **Core PHP/MySQL CRUD System** (Stable database application)\n4. **WordPress SEO Layout setups** (Search engine index & crawl optimization)";
  }
