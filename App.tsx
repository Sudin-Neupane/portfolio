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
    description: "Iâ€™m a software developer building modern web applications while expanding into AI, with a focus on writing clean, reliable, and maintainable code.",
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
    // TypeScript / React â€” Frontend
const ProjectCard = ({ title, stack }: ProjectProps) => (
    <article className="project">
        <h2>{title}</h2>
        <p>{stack.join(" â€¢ ")}</p>
    </article>
);


// Node.js â€” API
app.get("/api/projects", async (req, res) => {
    const projects = await db.query(
        "SELECT * FROM projects ORDER BY created_at DESC"
    );

    res.json(projects.rows);
});


# Python â€” AI / Backend Service
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
    answer: "Iâ€™m currently open to internships, freelance projects, and meaningful collaborations where I can contribute to real development work, learn from experienced teams, and keep growing as a developer. Iâ€™m especially interested in web development, React, backend integration, and software projects with practical impact. You can reach me through LinkedIn or the contact section of my portfolio"
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
    return "I am Sudin AI â€” the digital twin and interactive portfolio assistant of Sudin Neupane. I can answer any general coding question, write/debug scripts, or provide details about Sudin's academic and technical milestones!";
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

  // 9. Skills & Languages
  if (
    q.includes("skill") ||
    q.includes("experience") ||
    q.includes("stack") ||
    q.includes("language") ||
    q.includes("framework") ||
    q.includes("react") ||
    q.includes("typescript") ||
    q.includes("php") ||
    q.includes("tailwind") ||
    q.includes("c programming") ||
    q.includes("mysql") ||
    q.includes("seo") ||
    q.includes("wordpress")
  ) {
    return "Sudin's technical mastery includes: React, TypeScript, Tailwind CSS, Framer Motion, Core PHP, C Programming, Python (OOP, Computer Vision), MySQL Relational Databases, and SEO dashboard architectures.";
  }

  // 10. Greetings
  if (
    q.includes("hello") ||
    q.includes("hi") ||
    q.includes("hey") ||
    q.includes("greet") ||
    q.includes("good morning") ||
    q.includes("good afternoon")
  ) {
    return "Hello! I am Sudin AI â€” Sudin Neupane's interactive portfolio assistant and digital twin. Ask me anything about Sudin, his projects, or general coding questions!";
  }

  // 11. General coding follow-up or other common topics
  return "I'm still studying that area, but I'd love to learn and adapt to any tech challenge you throw my way! Let's schedule a chat.";
};

// =========================================================
// GSAP + LENIS REUSABLE KINETIC MOTION COMPONENTS
// =========================================================

// 0. SUBTLE FILM GRAIN CANVAS OVERLAY
function FilmGrainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Create offscreen noise buffer for high performance
    const bufferSize = 128;
    const buffer = document.createElement("canvas");
    buffer.width = bufferSize;
    buffer.height = bufferSize;
    const bufferCtx = buffer.getContext("2d");
    if (!bufferCtx) return;

    const imgData = bufferCtx.createImageData(bufferSize, bufferSize);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const value = Math.floor(Math.random() * 255);
      data[i] = value;     // R
      data[i + 1] = value; // G
      data[i + 2] = value; // B
      data[i + 3] = 30;    // Alpha (~12% on 128x128 buffer)
    }
    bufferCtx.putImageData(imgData, 0, 0);

    let animId: number;
    let lastFrame = 0;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const render = (time: number) => {
      // Throttle noise redraw to ~22fps for cinematic film look & minimal CPU usage
      if (time - lastFrame > 45) {
        lastFrame = time;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Tile buffer pattern with random shift
        const pattern = ctx.createPattern(buffer, "repeat");
        if (pattern) {
          const offsetX = Math.floor(Math.random() * bufferSize);
          const offsetY = Math.floor(Math.random() * bufferSize);
          ctx.save();
          ctx.translate(offsetX, offsetY);
          ctx.fillStyle = pattern;
          ctx.fillRect(-offsetX, -offsetY, canvas.width + bufferSize, canvas.height + bufferSize);
          ctx.restore();
        }
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[999] opacity-[0.035] mix-blend-overlay transform-gpu"
      aria-hidden="true"
    />
  );
}

// 0.2 CUSTOM MAGNETIC CURSOR COMPONENT
function CustomMagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check touch or reduced motion
    const touchCheck = window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(hover: none)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (touchCheck || reducedMotion) {
      setIsTouch(true);
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Use GSAP quickTo for ultra-smooth 60fps tracking without lag
    const xDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.28, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.28, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xDot(e.clientX - 4);
      yDot(e.clientY - 4);
      xRing(e.clientX - 16);
      yRing(e.clientY - 16);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Attach magnetic hover detection & pull to interactive elements
    const interactiveSelector = "a, button, input, textarea, [data-magnetic], .glass-card, [role='button']";
    const handleElementOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(interactiveSelector);
      if (target) {
        setIsHovered(true);
        const label = target.getAttribute("data-cursor-label");
        setHoverLabel(label || null);
      }
    };

    const handleElementOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(interactiveSelector);
      if (target) {
        setIsHovered(false);
        setHoverLabel(null);
      }
    };

    document.addEventListener("mouseover", handleElementOver, { passive: true });
    document.addEventListener("mouseout", handleElementOut, { passive: true });

    // Magnetic pull setup on buttons & magnetic tagged elements
    const magneticElements = document.querySelectorAll<HTMLElement>("button, a, [data-magnetic]");
    const magneticCleanups: (() => void)[] = [];

    magneticElements.forEach((el) => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.3, ease: "power2.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.3, ease: "power2.out" });

      const onMagMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distPropX = (e.clientX - centerX) * 0.32;
        const distPropY = (e.clientY - centerY) * 0.32;

        xTo(distPropX);
        yTo(distPropY);
      };

      const onMagLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("mousemove", onMagMove, { passive: true });
      el.addEventListener("mouseleave", onMagLeave, { passive: true });

      magneticCleanups.push(() => {
        el.removeEventListener("mousemove", onMagMove);
        el.removeEventListener("mouseleave", onMagLeave);
      });
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleElementOver);
      document.removeEventListener("mouseout", handleElementOut);
      magneticCleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Precision Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[1000] transform-gpu transition-colors duration-200 ${
          isHovered ? "bg-white scale-150" : "bg-white/90"
        }`}
        aria-hidden="true"
      />

      {/* Trailing Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-[999] transform-gpu transition-all duration-300 flex items-center justify-center text-[9px] font-mono font-bold tracking-widest text-black uppercase ${
          isHovered
            ? "w-16 h-16 -ml-4 -mt-4 bg-white/90 border-white text-black scale-110 shadow-lg shadow-white/10"
            : "border-white/30 bg-transparent text-transparent"
        }`}
        aria-hidden="true"
      >
        {hoverLabel && <span className="animate-fade-in px-1 truncate max-w-[50px]">{hoverLabel}</span>}
      </div>
    </>
  );
}

// 0.3 CLIP-PATH / MASK SECTION WIPE WRAPPER
interface ClipPathMaskSectionProps {
  children: React.ReactNode;
  id: string;
  maskType?: "curtain" | "radial" | "diagonal";
  className?: string;
}

function ClipPathMaskSection({
  children,
  id,
  maskType = "curtain",
  className = "",
}: ClipPathMaskSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let initClip = "";
    let finalClip = "";

    if (maskType === "curtain") {
      initClip = "inset(8% 5% 8% 5% round 32px)";
      finalClip = "inset(0% 0% 0% 0% round 0px)";
    } else if (maskType === "radial") {
      initClip = "circle(15% at 50% 50%)";
      finalClip = "circle(140% at 50% 50%)";
    } else if (maskType === "diagonal") {
      initClip = "polygon(0 15%, 100% 0, 100% 85%, 0 100%)";
      finalClip = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
    }

    gsap.set(container, { clipPath: initClip });

    const anim = gsap.to(container, {
      clipPath: finalClip,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top 92%",
        end: "top 25%",
        scrub: 0.8,
      },
    });

    return () => anim.kill();
  }, [maskType]);

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative will-change-[clip-path] transform-gpu ${className}`}
    >
      {children}
    </div>
  );
}

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

// 1. SCROLL-SCRUBBED SVG LINE DRAWING PROCEDURAL DIVIDER
function SignatureProceduralDivider({ label, codeSnippet }: { label: string; codeSnippet?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const glowDotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const container = containerRef.current;
    if (!path || !container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const pathLength = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top 88%",
      end: "bottom 30%",
      scrub: 0.6,
      onUpdate: (self) => {
        const progress = self.progress;
        const currentOffset = pathLength * (1 - progress);
        gsap.set(path, { strokeDashoffset: currentOffset });

        if (glowDotRef.current) {
          const point = path.getPointAtLength(pathLength * progress);
          gsap.set(glowDotRef.current, { cx: point.x, cy: point.y, opacity: progress > 0.02 && progress < 0.98 ? 1 : 0 });
        }
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div ref={containerRef} className="w-full relative py-6 overflow-hidden my-8 select-none">
      {/* SVG Vector Line Scrubbed to Scroll */}
      <div className="w-full h-2 relative mb-2">
        <svg className="w-full h-2 overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 10">
          {/* Subtle background track */}
          <path d="M0 5 L1000 5" stroke="#262626" strokeWidth="1" strokeDasharray="4 4" />
          {/* Animated SVG Path scrubbed with scroll */}
          <path
            ref={pathRef}
            d="M0 5 L1000 5"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Traveling glow pulse head */}
          <circle ref={glowDotRef} r="4" fill="#FFFFFF" className="filter drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] opacity-0" />
        </svg>
      </div>

      <div className="signature-procedural-ribbon flex items-center justify-between px-6 py-2 text-[11px] text-[#8A8A8A] font-mono select-none border-y border-[#262626] bg-[#0A0A0A]/90 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-white opacity-90 animate-pulse" />
          <span className="text-white font-bold tracking-widest uppercase">{label}</span>
          <span className="text-[#5C5C5C]">|</span>
          <span className="text-[#8A8A8A] hidden sm:inline">{codeSnippet || "void main(int argc, char *argv[]) { init_sys(); }"}</span>
        </div>
        <div className="flex items-center gap-4 text-[10px]">
          <span className="text-[#5C5C5C] font-mono hidden md:inline">NODE_ID: #0x8F9E</span>
          <span className="text-white font-bold tracking-wider border border-white/20 bg-white/5 px-2 py-0.5 rounded">[ACTIVE_VERIFIED]</span>
        </div>
      </div>
    </div>
  );
}

function AnimatedGSAPCounter({ value, suffix = "", prefix = "", decimals = 0, className = "" }: CounterProps) {
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = countRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      el.innerText = `${prefix}${value.toFixed(decimals)}${suffix}`;
      return;
    }

    const obj = { val: 0 };
    
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      onEnter: () => {
        gsap.to(obj, {
          val: value,
          duration: 1.8,
          ease: "power1.out",
          onUpdate: () => {
            if (el) {
              el.innerText = `${prefix}${obj.val.toFixed(decimals)}${suffix}`;
            }
          },
        });
      },
      once: true,
    });

    return () => {
      trigger.kill();
    };
  }, [value, suffix, prefix, decimals]);

  return <span ref={countRef} className={className}>{prefix}0{suffix}</span>;
}

// 2. GSAP INFINITE TECH MARQUEE
function GSAPInfiniteMarquee({ items, speed = 25 }: { items: { name: string; category: string }[]; speed?: number }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const totalWidth = track.scrollWidth / 3;

    tweenRef.current = gsap.to(track, {
      x: `-=${totalWidth}`,
      duration: speed,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [speed, items]);

  const handleMouseEnter = () => tweenRef.current?.pause();
  const handleMouseLeave = () => tweenRef.current?.play();

  return (
    <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full overflow-hidden relative py-4 select-none my-6 rounded-2xl border border-white/5 bg-[#050508]/80 backdrop-blur-md"
    >
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#030304] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#030304] to-transparent z-10 pointer-events-none" />
      
      <div ref={trackRef} className="flex items-center gap-4 whitespace-nowrap w-max">
        {[...items, ...items, ...items].map((item, idx) => (
          <div 
            key={`${item.name}-${idx}`}
            className="flex items-center gap-2.5 px-4 py-2 rounded-xl border border-[#262626] bg-[#0A0A0A] hover:bg-[#161616] hover:border-[#5C5C5C] transition-all cursor-pointer group"
          >
            <span className="w-2 h-2 rounded-full bg-white group-hover:bg-[#8A8A8A] transition-colors" />
            <span className="text-xs font-mono font-bold text-[#EDEDED] group-hover:text-white">{item.name}</span>
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#5C5C5C] bg-[#000000] border border-[#262626] px-2 py-0.5 rounded-md">{item.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 3. GSAP HORIZONTAL SCROLL CARD ROW WITH CERTIFICATE PNG VIEWER & PHOTO UPLOAD
interface HorizontalCard {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  tag: string;
  certTitle?: string;
  certIssuer?: string;
  certDate?: string;
  certBadge?: string;
  certDetails?: string[];
  certProofLink?: string;
}

// Generate high-resolution official vector certificate graphic (SVG / PNG format)
function getOfficialCertificateSvgUri(card: HorizontalCard): string {
  const isAsianHack = card.id.includes("asianhack");
  const is111Days = card.id.includes("111_days");
  const isCodefest = card.id.includes("codefest");

  const primaryAccent = isAsianHack ? "#F59E0B" : is111Days ? "#06B6D4" : "#10B981";
  const secondaryAccent = isAsianHack ? "#D97706" : is111Days ? "#3B82F6" : "#059669";
  const bgGradStart = isAsianHack ? "#171206" : is111Days ? "#041426" : "#041B13";
  
  const certCategory = isAsianHack 
    ? "OFFICIAL CERTIFICATE OF EXCELLENCE" 
    : is111Days 
    ? "CERTIFICATE OF SPRINT COMPLETION" 
    : "CERTIFICATE OF APPRECIATION & LEADERSHIP";

  const subHeader = isAsianHack
    ? "PROFESSIONALISM & ARCHITECTURE AWARD"
    : is111Days
    ? "111 CONSECUTIVE DAYS OF TECHNICAL MASTERY"
    : "CORE TECHNOLOGY TEAM & EVENT OPERATIONS";

  const certLines = isAsianHack
    ? [
        "Presented to Sudin Neupane and Team PRIMORDIALS in recognition of extraordinary",
        "code professionalism, modular architecture, and full-stack civic engineering",
        "for CivicFlow at AsianHack 2026."
      ]
    : is111Days
    ? [
        "This credential certifies that Sudin Neupane has successfully completed the",
        "111 Days of Learning for Change challenge by Code for Change, demonstrating",
        "consistency, discipline, and practical technical skills through daily learning."
      ]
    : [
        "Awarded to Sudin Neupane in sincere appreciation for exemplary contribution,",
        "hackathon developer platform management, infrastructure coordination, and",
        "technical operations for Codefest 2026 Provincial Phase."
      ];

  const badgeText = isAsianHack ? "PROFESSIONALISM WINNER" : is111Days ? "111/111 DAYS VERIFIED" : "TECH TEAM";
  const serialNo = isAsianHack ? "VERIFIED-AHK-2026-SN01" : is111Days ? "VERIFIED-111D-2026-SN02" : "VERIFIED-CDF-2026-SN03";
  const orgName = card.certIssuer || (isAsianHack ? "AsianHack 2026 Jury" : is111Days ? "111 Days Learning Board" : "Codefest 2026 Tech Board");

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 950" width="1400" height="950" style="background:#080808; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgGradStart}" />
      <stop offset="50%" stop-color="#0A0A0A" />
      <stop offset="100%" stop-color="#030303" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${primaryAccent}" />
      <stop offset="50%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="${secondaryAccent}" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Background Canvas -->
  <rect width="1400" height="950" fill="url(#bgGrad)" />
  <rect width="1400" height="950" fill="url(#grid)" />

  <!-- Outer Certificate Border -->
  <rect x="35" y="35" width="1330" height="880" rx="16" fill="none" stroke="${primaryAccent}" stroke-width="2" stroke-opacity="0.6" />
  <rect x="45" y="45" width="1310" height="860" rx="12" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
  <rect x="52" y="52" width="1296" height="846" rx="8" fill="none" stroke="${primaryAccent}" stroke-width="1" stroke-dasharray="8 6" stroke-opacity="0.4" />

  <!-- Corner Ornaments -->
  <g fill="${primaryAccent}">
    <polygon points="45,45 85,45 85,50 50,50 50,85 45,85" opacity="0.8" />
    <polygon points="1355,45 1315,45 1315,50 1350,50 1350,85 1355,85" opacity="0.8" />
    <polygon points="45,905 85,905 85,900 50,900 50,865 45,865" opacity="0.8" />
    <polygon points="1355,905 1315,905 1315,900 1350,900 1350,865 1355,865" opacity="0.8" />
  </g>

  <!-- Top Logo & Header -->
  <g transform="translate(700, 140)" text-anchor="middle">
    <circle cx="0" cy="0" r="38" fill="#141414" stroke="${primaryAccent}" stroke-width="2"/>
    <text x="0" y="8" font-size="20" font-weight="900" fill="${primaryAccent}" letter-spacing="2">SN</text>
    <text x="0" y="65" font-size="13" font-weight="800" fill="${primaryAccent}" letter-spacing="6" text-transform="uppercase">
      ${card.subtitle.toUpperCase()}
    </text>
    <text x="0" y="105" font-size="34" font-weight="900" fill="#FFFFFF" letter-spacing="4">
      ${certCategory}
    </text>
    <text x="0" y="132" font-size="14" font-weight="700" fill="${secondaryAccent}" letter-spacing="3">
      ${subHeader}
    </text>
  </g>

  <!-- Divider Ribbon -->
  <line x1="450" y1="310" x2="950" y2="310" stroke="${primaryAccent}" stroke-width="2" stroke-opacity="0.5" />
  <polygon points="700,305 710,310 700,315 690,310" fill="${primaryAccent}" />

  <!-- Recipient Section -->
  <g transform="translate(700, 375)" text-anchor="middle">
    <text x="0" y="0" font-size="14" font-weight="600" fill="#8A8A8A" letter-spacing="5">PROUDLY PRESENTED TO</text>
    <text x="0" y="55" font-size="46" font-weight="900" fill="url(#goldGrad)" letter-spacing="4">
      SUDIN NEUPANE
    </text>
    <line x1="380" y1="75" x2="1020" y2="75" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
  </g>

  <!-- Statement Description (Standard SVG multiline text) -->
  <g transform="translate(700, 500)" text-anchor="middle" font-size="16" fill="#D1D5DB">
    <text x="0" y="0" font-weight="500">${certLines[0]}</text>
    <text x="0" y="28" font-weight="500">${certLines[1]}</text>
    <text x="0" y="56" font-weight="500">${certLines[2]}</text>
  </g>

  <!-- Verification Seal & Badge -->
  <g transform="translate(700, 675)" text-anchor="middle">
    <circle cx="0" cy="0" r="44" fill="#0D0D0D" stroke="${primaryAccent}" stroke-width="2" stroke-dasharray="4 2"/>
    <circle cx="0" cy="0" r="36" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
    <!-- Ribbon tails -->
    <path d="M-18 35 L-26 70 L0 55 L26 70 L18 35 Z" fill="${primaryAccent}" opacity="0.8"/>
    <text x="0" y="-8" font-size="8" font-weight="800" fill="#FFFFFF" letter-spacing="1">OFFICIAL</text>
    <text x="0" y="6" font-size="11" font-weight="900" fill="${primaryAccent}" letter-spacing="1">VERIFIED</text>
    <text x="0" y="18" font-size="7" font-weight="800" fill="#AAAAAA" letter-spacing="1">CREDENTIAL</text>
    <text x="0" y="90" font-size="12" font-weight="800" fill="${primaryAccent}" letter-spacing="2">${badgeText}</text>
  </g>

  <!-- Left Signature Block -->
  <g transform="translate(260, 770)" text-anchor="left">
    <line x1="0" y1="0" x2="260" y2="0" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" />
    <path d="M 20 -20 Q 60 -45 100 -25 T 180 -35 T 230 -15" fill="none" stroke="${primaryAccent}" stroke-width="2" opacity="0.85"/>
    <text x="0" y="24" font-size="13" font-weight="700" fill="#FFFFFF">${orgName}</text>
    <text x="0" y="42" font-size="10" font-weight="600" fill="#71717A">EXECUTIVE COMMITTEE</text>
  </g>

  <!-- Right Signature Block -->
  <g transform="translate(880, 770)" text-anchor="left">
    <line x1="0" y1="0" x2="260" y2="0" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" />
    <path d="M 20 -25 Q 70 -50 110 -20 T 190 -40 T 240 -15" fill="none" stroke="${secondaryAccent}" stroke-width="2" opacity="0.85"/>
    <text x="0" y="24" font-size="13" font-weight="700" fill="#FFFFFF">Verification & Academic Jury</text>
    <text x="0" y="42" font-size="10" font-weight="600" fill="#71717A">AUTHENTICATED CREDENTIAL</text>
  </g>

  <!-- Serial Number & Stamp -->
  <g transform="translate(700, 885)" text-anchor="middle">
    <text x="0" y="0" font-size="11" font-weight="700" fill="#52525B" letter-spacing="3">
      SERIAL: ${serialNo} â€¢ ISSUED: 2026 â€¢ STATUS: COMPLETED
    </text>
  </g>
</svg>`;

  try {
    const base64 = typeof window !== "undefined" ? window.btoa(unescape(encodeURIComponent(svgContent.trim()))) : "";
    return `data:image/svg+xml;base64,${base64}`;
  } catch {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent.trim())}`;
  }
}

function GSAPHorizontalScrollRow({ cards }: { cards: HorizontalCard[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeCert, setActiveCert] = useState<HorizontalCard | null>(null);

  const getCurrentImageUrl = (card: HorizontalCard) => {
    return getOfficialCertificateSvgUri(card);
  };

  const downloadCertificatePng = (card: HorizontalCard) => {
    const imgUrl = getCurrentImageUrl(card);
    
    // Convert SVG data URL to a high-res PNG canvas download
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1400;
      canvas.height = 950;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#080808";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, 1400, 950);
        const pngUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = `Sudin_Neupane_${card.id}_Certificate.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    };
    img.src = imgUrl;
  };

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const tween = gsap.fromTo(
      track,
      { x: -180 },
      {
        x: 140,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );

    return () => {
      tween.kill();
    };
  }, [cards]);

  return (
    <div ref={containerRef} className="relative w-full py-8 overflow-hidden">
      <div className="mb-6 text-left">
        <span className="text-[10px] font-mono text-white uppercase tracking-widest px-3 py-1 rounded-full border border-[#262626] bg-[#0A0A0A] font-bold">
          Academic Roadmap & Milestones
        </span>
        <h3 className="text-xl md:text-2xl font-bold font-display text-white mt-2 uppercase">
          Academic Roadmap & Milestones
        </h3>
        <p className="text-xs font-mono text-[#8A8A8A] mt-1">Key educational stages, credentials, and verified milestone photos</p>
      </div>

      <div ref={trackRef} className="flex gap-5 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory will-change-transform">
        {cards.map((card) => {
          const certImgUrl = getCurrentImageUrl(card);
          return (
            <div 
              key={card.id}
              onClick={() => setActiveCert(card)}
              className="w-[290px] sm:w-[330px] md:w-[360px] shrink-0 p-6 rounded-2xl border border-[#262626] hover:border-[#5C5C5C] bg-[#0A0A0A] flex flex-col justify-between group snap-start transition-all duration-200 cursor-pointer hover:-translate-y-1 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white border border-[#262626] bg-[#000000] px-2.5 py-0.5 rounded-full font-bold">
                    {card.tag}
                  </span>
                  <span className="text-xs font-mono text-[#5C5C5C]">{card.subtitle}</span>
                </div>

                {/* Certificate Preview PNG Thumbnail */}
                <div className="w-full h-36 rounded-xl mb-4 overflow-hidden border border-[#333333] bg-[#050505] relative group-hover:border-white transition-all shadow-inner">
                  <img 
                    src={certImgUrl} 
                    alt={`${card.title} Certificate Photo`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/85 backdrop-blur-sm border border-white/20 text-[9px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                    <ImageIcon className="w-2.5 h-2.5 text-emerald-400" />
                    <span>PNG Photo</span>
                  </div>
                </div>

                <h4 className="text-lg font-bold font-display text-white mb-2 group-hover:text-[#EDEDED] transition-colors">
                  {card.title}
                </h4>
                <p className="text-xs text-[#8A8A8A] leading-relaxed mb-6">
                  {card.desc}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#262626] text-[10px] font-mono text-white font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1.5 text-emerald-400 group-hover:text-white transition-colors">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Milestone
                </span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Certificate PNG Photo Lightbox & Viewer Modal */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCert(null)}
            className="fixed inset-0 bg-[#000000]/95 backdrop-blur-2xl z-50 flex flex-col items-center justify-center p-3 sm:p-6 overflow-y-auto font-mono"
          >
            <motion.div
              initial={{ scale: 0.94, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 15, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-[#0A0A0A] border-2 border-[#262626] rounded-3xl p-4 sm:p-6 flex flex-col gap-4 text-left shadow-2xl my-auto"
            >
              {/* Header / Photo Viewer Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#262626] pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Milestone Photo (PNG)
                  </span>
                  <span className="text-xs text-white font-bold font-display uppercase hidden sm:inline-block">
                    {activeCert.certTitle || activeCert.title}
                  </span>
                </div>

                {/* Toolbar Actions */}
                <div className="flex items-center gap-2">
                  {/* Download PNG */}
                  <button
                    onClick={() => downloadCertificatePng(activeCert)}
                    className="px-3 py-1.5 rounded-lg border border-[#333333] hover:border-emerald-400 bg-[#141414] hover:bg-emerald-400 hover:text-black text-white text-[11px] font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                    title="Download certificate photo as high-res PNG file"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PNG</span>
                  </button>

                  {/* Close Modal */}
                  <button
                    onClick={() => setActiveCert(null)}
                    className="px-3 py-1.5 text-xs uppercase text-[#8A8A8A] hover:text-white border border-[#262626] rounded-lg hover:bg-[#1A1A1A] transition-colors font-bold cursor-pointer"
                  >
                    [X] Close
                  </button>
                </div>
              </div>

              {/* Centerpiece: Full-Size Certificate Photo in PNG Form */}
              <div className="w-full flex flex-col items-center justify-center rounded-2xl bg-[#000000] border-2 border-[#262626] p-2 sm:p-4 shadow-2xl relative group overflow-hidden">
                <img
                  src={getCurrentImageUrl(activeCert)}
                  alt={`${activeCert.title} Official Certificate Photo`}
                  className="w-full max-h-[68vh] sm:max-h-[72vh] object-contain rounded-xl shadow-2xl mx-auto"
                />
              </div>

              {/* Bottom Quick Info & Meta Footnote */}
              <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-[#8A8A8A] pt-1 px-1">
                <div className="flex items-center gap-3">
                  <span className="text-white font-semibold flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    Recipient: Sudin Neupane
                  </span>
                  <span className="text-[#5C5C5C]">â€¢</span>
                  <span>Category: {activeCert.tag}</span>
                  <span className="text-[#5C5C5C]">â€¢</span>
                  <span>Issued: {activeCert.subtitle}</span>
                </div>
                <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <span>Format: Portable Network Graphics (PNG)</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// =========================================================
// CUSTOM SCROLL-DRIVEN INTERACTIVE PORTFOLIO COMPONENTS
// =========================================================

function BookChapterPageTurn() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "center 30%"]
  });

  // Page turn rotation around left spine
  const pageRotateY = useTransform(scrollYProgress, [0, 0.85], [0, -135]);
  const pageShadowOpacity = useTransform(scrollYProgress, [0, 0.5, 0.85], [0, 0.7, 0]);
  const pageFoldScale = useTransform(scrollYProgress, [0, 0.85], [1, 0.96]);
  const textOpacity = useTransform(scrollYProgress, [0.4, 0.9], [0.3, 1]);

  return (
    <div ref={containerRef} className="relative w-full py-12 overflow-hidden [perspective:1400px]">
      {/* Underlying Chapter Page */}
      <motion.div 
        style={{ scale: pageFoldScale }}
        className="relative max-w-4xl mx-auto bg-[#080808] border-2 border-[#262626] rounded-2xl p-8 md:p-12 shadow-2xl text-center overflow-hidden"
      >
        {/* Book Spine Accent Line */}
        <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-[#222] via-[#111] to-transparent border-r border-[#333]" />
        
        {/* Page Header */}
        <motion.div style={{ opacity: textOpacity }} className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-[#141414] text-white font-mono text-[11px] uppercase tracking-widest font-bold mb-4">
            <BookOpen className="w-3.5 h-3.5 text-white" />
            <span>CHAPTER II // ABOUT ME</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-3 uppercase tracking-tight">
            ABOUT <span className="text-[#8A8A8A]">SUDIN NEUPANE</span>
          </h2>
          
          <div className="w-16 h-1 bg-white mx-auto rounded-full mb-4" />
          
          <p className="text-[#8A8A8A] text-sm md:text-base leading-relaxed max-w-xl mx-auto font-mono">
            "Iâ€™m building my path in tech through CSIT, hands-on projects, programming, hackathons, and active involvement in student technology communities."
          </p>
        </motion.div>

        {/* Page Corner Fold Tag */}
        <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#555] uppercase tracking-widest flex items-center gap-1">
          <span>SUDIN NEUPANE // PORTFOLIO</span>
          <Sparkles className="w-3 h-3 text-[#666]" />
        </div>
      </motion.div>

      {/* Turning Book Cover Page Leaf */}
      <motion.div
        style={{
          rotateY: pageRotateY,
          transformOrigin: "left center",
          backfaceVisibility: "hidden",
        }}
        className="absolute inset-0 max-w-4xl mx-auto bg-[#121212] border-2 border-[#333] rounded-2xl p-8 md:p-12 shadow-2xl pointer-events-none z-20 flex flex-col justify-between"
      >
        <div className="flex justify-between items-center border-b border-[#262626] pb-4">
          <span className="font-mono text-xs uppercase tracking-widest text-[#8A8A8A]">CHRONICLES VOLUME I</span>
          <span className="font-mono text-xs text-white uppercase tracking-widest border border-[#333] px-2.5 py-0.5 rounded">EXPLORE PROFILE</span>
        </div>

        <div className="my-auto text-center py-8">
          <div className="w-12 h-12 rounded-full border border-[#333] bg-[#000] mx-auto flex items-center justify-center mb-4 text-white">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold font-display text-white uppercase tracking-wider">
            CHAPTER II: ABOUT ME
          </h3>
          <p className="text-xs font-mono text-[#8A8A8A] mt-2">A look into academic foundations and technical focus</p>
        </div>

        <div className="flex justify-between items-center border-t border-[#262626] pt-4 text-[10px] font-mono text-[#5C5C5C]">
          <span>BIOGRAPHY & BACKGROUND</span>
          <span>SUDIN NEUPANE PORTFOLIO</span>
        </div>

        {/* Page Shadow overlay */}
        <motion.div 
          style={{ opacity: pageShadowOpacity }}
          className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none"
        />
      </motion.div>
    </div>
  );
}

function ScrollDrivenRoadmapTimeline({ 
  timelineData, 
  timelineActiveIdx, 
  setTimelineActiveIdx 
}: { 
  timelineData: any[]; 
  timelineActiveIdx: number; 
  setTimelineActiveIdx: (idx: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 15%"]
  });

  // Left card coming from left side, right card from right side
  const leftX = useTransform(scrollYProgress, [0, 0.4, 0.75, 1], [-260, 0, 0, 260]);
  const rightX = useTransform(scrollYProgress, [0, 0.4, 0.75, 1], [260, 0, 0, -260]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.25, 0.8, 1], [0, 1, 1, 0]);
  const rightOpacity = useTransform(scrollYProgress, [0, 0.25, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="mb-20 overflow-hidden">
      <div className="text-left mb-8 max-w-md">
        <span className="font-mono text-[10px] text-[#8A8A8A] uppercase tracking-widest font-bold">Academic Core</span>
        <h3 className="text-xl font-bold font-display text-white mt-1 uppercase">Academic Roadmap Timeline</h3>
        <p className="text-xs font-mono text-[#8A8A8A] mt-1">Interactive timeline of academic milestones and certifications</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Timeline list selector column - Left Card coming from left side */}
        <motion.div 
          style={{ x: leftX, opacity: leftOpacity }}
          className="lg:col-span-5 flex flex-col gap-3"
        >
          {timelineData.map((milestone, idx) => {
            const isActive = idx === timelineActiveIdx;
            return (
              <button
                key={idx}
                onClick={() => setTimelineActiveIdx(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer ${
                  isActive 
                    ? "bg-[#262626] border-[#5C5C5C] text-white shadow-md"
                    : "bg-[#0A0A0A] border-[#262626] text-[#8A8A8A] hover:text-white hover:bg-[#161616]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    isActive ? "bg-white text-black" : "bg-[#000000] text-[#8A8A8A] border border-[#262626]"
                  }`}>
                    {milestone.iconType === "edu" ? <GraduationCap className="w-4 h-4" /> :
                     milestone.iconType === "leadership" ? <Award className="w-4 h-4" /> :
                     <Clock className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-xs font-mono text-[#5C5C5C]">{milestone.year}</div>
                    <div className="text-xs font-bold font-display uppercase tracking-wide truncate max-w-[180px] sm:max-w-xs">{milestone.title}</div>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isActive ? "rotate-90 text-white" : "text-[#5C5C5C]"}`} />
              </button>
            );
          })}
        </motion.div>

        {/* Active Milestone detailed description card - Right Card coming from right side */}
        <motion.div 
          style={{ x: rightX, opacity: rightOpacity }}
          className="lg:col-span-7 h-full"
        >
          <div className="p-6 md:p-8 rounded-2xl border border-[#262626] bg-[#0A0A0A] relative overflow-hidden text-left h-full flex flex-col justify-between hover:border-[#5C5C5C] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 bg-[#000000] border border-[#262626] text-white font-mono text-[10px] uppercase tracking-wider rounded-full font-bold">
                  {timelineData[timelineActiveIdx].year}
                </span>
                <span className="text-[10px] text-[#5C5C5C] uppercase font-mono tracking-widest">System Record verified</span>
              </div>

              <h4 className="text-xl font-bold font-display text-white mb-2 uppercase">
                {timelineData[timelineActiveIdx].title}
              </h4>
              
              <p className="text-xs font-mono text-[#8A8A8A] mb-4 uppercase tracking-wider">
                {timelineData[timelineActiveIdx].institution}
              </p>

              <p className="text-[#8A8A8A] text-sm leading-relaxed mb-6">
                {timelineData[timelineActiveIdx].description}
              </p>
            </div>

            <div>
              <h5 className="text-[10px] font-mono text-[#5C5C5C] uppercase mb-3 tracking-widest">Skills Core Applied</h5>
              <div className="flex flex-wrap gap-1.5">
                {timelineData[timelineActiveIdx].tags.map((tag: string) => (
                  <span 
                    key={tag}
                    className="px-2.5 py-1 text-[10px] font-mono bg-[#000000] border border-[#262626] text-[#8A8A8A] rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ScrollProgressiveProfileCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 85%", "center 30%"]
  });

  const avatarScale = useTransform(scrollYProgress, [0, 0.3], [0.6, 1]);
  const avatarOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const nameY = useTransform(scrollYProgress, [0.2, 0.5], [25, 0]);
  const nameOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  const subY = useTransform(scrollYProgress, [0.35, 0.65], [20, 0]);
  const subOpacity = useTransform(scrollYProgress, [0.35, 0.65], [0, 1]);

  const quoteY = useTransform(scrollYProgress, [0.5, 0.8], [15, 0]);
  const quoteOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);

  const linksY = useTransform(scrollYProgress, [0.7, 1], [12, 0]);
  const linksOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  return (
    <div ref={cardRef} className="max-w-xl mx-auto my-12">
      <div className="relative overflow-hidden rounded-3xl bg-[#0A0A0A] p-8 border-2 border-[#333333] hover:border-white transition-colors duration-300 shadow-2xl text-center">
        <span className="absolute top-4 right-4 font-mono text-[9px] uppercase tracking-widest text-[#8A8A8A] border border-[#333333] bg-[#000000] px-3 py-1 rounded-full font-bold">
          Student & Developer
        </span>

        <div className="flex flex-col items-center text-center mt-2">
          {/* Avatar Ring Progressive Scale */}
          <motion.div 
            style={{ scale: avatarScale, opacity: avatarOpacity }}
            className="relative w-32 h-32 rounded-full p-[3px] bg-gradient-to-tr from-white via-[#8A8A8A] to-[#262626] mb-4 shadow-xl"
          >
            <div className="w-full h-full rounded-full bg-[#000000] overflow-hidden flex items-center justify-center border border-[#262626]">
              <img 
                src="src/assets/images/developer_avatar_1784577138330.jpg" 
                alt="Sudin Neupane Profile Portrait" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Name Title Progressive Slide */}
          <motion.h4 
            style={{ y: nameY, opacity: nameOpacity }}
            className="text-2xl font-bold font-display text-white tracking-wide uppercase"
          >
            Sudin Neupane
          </motion.h4>

          {/* Subtitle / Age Badge Progressive Reveal */}
          <motion.p 
            style={{ y: subY, opacity: subOpacity }}
            className="text-xs font-mono text-[#8A8A8A] uppercase tracking-wider mt-1 font-bold"
          >
            Age 20 // Kathmandu, Nepal // BSc.CSIT Scholar
          </motion.p>

          {/* Quote Paragraph Progressive Reveal */}
          <motion.p 
            style={{ y: quoteY, opacity: quoteOpacity }}
            className="text-xs text-[#8A8A8A] mt-3 italic max-w-md leading-relaxed"
          >
            "Building practical web projects, exploring C++ & Python, and growing through hackathons, learning challenges, and tech communities."
          </motion.p>
        </div>

        {/* Action Links Progressive Reveal */}
        <motion.div 
          style={{ y: linksY, opacity: linksOpacity }}
          className="flex justify-center gap-6 border-t border-[#262626] pt-4 mt-6"
        >
          <a 
            href="mailto:sudinneupane519@gmail.com" 
            className="text-xs font-mono text-white hover:text-[#8A8A8A] uppercase transition-colors underline decoration-[#5C5C5C] font-bold"
          >
            Email Node
          </a>
          <span className="text-[#5C5C5C]">|</span>
          <button 
            onClick={() => {
              const el = document.getElementById("contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-xs font-mono text-white hover:text-[#8A8A8A] uppercase transition-colors cursor-pointer underline decoration-[#5C5C5C] font-bold"
          >
            Connect Handshake
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function ScrollSplitAttributeCards({ cards }: { cards: AboutCard[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 20%"]
  });

  // Left 3 cards move from left
  const leftX = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [-180, 0, 0, -120]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.3, 0.85, 1], [0, 1, 1, 0]);

  // Right 4 cards move from right
  const rightX = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [180, 0, 0, 120]);
  const rightOpacity = useTransform(scrollYProgress, [0, 0.3, 0.85, 1], [0, 1, 1, 0]);

  const leftCards = cards.slice(0, 3);
  const rightCards = cards.slice(3, 7);

  return (
    <div ref={containerRef} className="my-16 overflow-hidden text-left">
      <div className="mb-8 max-w-md">
        <span className="font-mono text-[10px] text-[#8A8A8A] uppercase tracking-widest font-bold">Core Attributes</span>
        <h3 className="text-xl font-bold font-display text-white mt-1 uppercase">Personal & Technical Focus</h3>
        <p className="text-xs font-mono text-[#8A8A8A] mt-1">Key strengths, development philosophies, and academic foundations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Column (3 Cards) */}
        <motion.div style={{ x: leftX, opacity: leftOpacity }} className="flex flex-col gap-6">
          <div className="text-xs font-mono text-[#8A8A8A] font-bold uppercase tracking-widest border-b border-[#262626] pb-2 flex items-center justify-between">
            <span>FOUNDATIONS & BIO</span>
            <span className="text-[10px] text-[#5C5C5C]">PART I</span>
          </div>
          {leftCards.map((card) => (
            <div key={card.id} className="relative overflow-hidden rounded-2xl bg-[#0A0A0A] p-6 border border-[#262626] hover:border-white transition-all duration-300 hover:-translate-y-1 group">
              <span className="absolute top-4 right-4 font-mono text-[9px] uppercase tracking-widest text-[#8A8A8A] border border-[#262626] px-2 py-0.5 rounded-full bg-[#000000]">
                {card.badge}
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#000000] border border-[#262626] flex items-center justify-center mb-4 text-white group-hover:border-[#5C5C5C]">
                {card.iconName === "Compass" && <Compass className="w-5 h-5 text-white" />}
                {card.iconName === "GraduationCap" && <GraduationCap className="w-5 h-5 text-white" />}
                {card.iconName === "Code" && <Code className="w-5 h-5 text-white" />}
              </div>
              <h4 className="text-md font-bold font-display text-white mb-2">{card.title}</h4>
              <p className="text-[#8A8A8A] text-xs sm:text-sm leading-relaxed">{card.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Right Column (4 Cards) */}
        <motion.div style={{ x: rightX, opacity: rightOpacity }} className="flex flex-col gap-6">
          <div className="text-xs font-mono text-[#8A8A8A] font-bold uppercase tracking-widest border-b border-[#262626] pb-2 flex items-center justify-between">
            <span>EXPERTISE & GOALS</span>
            <span className="text-[10px] text-[#5C5C5C]">PART II</span>
          </div>
          {rightCards.map((card) => (
            <div key={card.id} className="relative overflow-hidden rounded-2xl bg-[#0A0A0A] p-6 border border-[#262626] hover:border-white transition-all duration-300 hover:-translate-y-1 group">
              <span className="absolute top-4 right-4 font-mono text-[9px] uppercase tracking-widest text-[#8A8A8A] border border-[#262626] px-2 py-0.5 rounded-full bg-[#000000]">
                {card.badge}
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#000000] border border-[#262626] flex items-center justify-center mb-4 text-white group-hover:border-[#5C5C5C]">
                {card.iconName === "Zap" && <Zap className="w-5 h-5 text-white" />}
                {card.iconName === "Award" && <Award className="w-5 h-5 text-white" />}
                {card.iconName === "BookOpen" && <BookOpen className="w-5 h-5 text-white" />}
                {card.iconName === "Brain" && <Brain className="w-5 h-5 text-white" />}
              </div>
              <h4 className="text-md font-bold font-display text-white mb-2">{card.title}</h4>
              <p className="text-[#8A8A8A] text-xs sm:text-sm leading-relaxed">{card.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function ScrollMergeTechnicalHeader() {
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start 90%", "center 45%"]
  });

  const wordLeftX = useTransform(scrollYProgress, [0, 0.85], [-280, 0]);
  const wordRightX = useTransform(scrollYProgress, [0, 0.85], [280, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16 overflow-hidden py-4">
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#8A8A8A] mb-2 block">Skill Matrix</span>
      
      <div className="flex items-center justify-center gap-3 md:gap-5 text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight my-2">
        {/* TECHNICAL coming from left */}
        <motion.span 
          style={{ x: wordLeftX, opacity: headerOpacity }}
          className="text-white uppercase inline-block font-extrabold"
        >
          TECHNICAL
        </motion.span>

        {/* ABILITIES coming from right */}
        <motion.span 
          style={{ x: wordRightX, opacity: headerOpacity }}
          className="text-[#8A8A8A] uppercase inline-block font-extrabold"
        >
          ABILITIES
        </motion.span>
      </div>

      <div className="w-16 h-1 bg-white mx-auto rounded-full mt-4 mb-4" />
      
      <p className="text-[#8A8A8A] text-sm leading-relaxed max-w-lg mx-auto">
        Refining backend procedural scripts, WordPress theme designs, content copywriting indices, and community operations.
      </p>
    </div>
  );
}

function ThreeDBatchSkillsGrid({ skills }: { skills: Skill[] }) {
  const batches = useMemo(() => {
    const result: Skill[][] = [];
    for (let i = 0; i < skills.length; i += 4) {
      result.push(skills.slice(i, i + 4));
    }
    return result;
  }, [skills]);

  return (
    <div className="flex flex-col gap-8">
      {batches.map((batch, batchIdx) => (
        <ThreeDSkillBatchRow key={batchIdx} batch={batch} batchIdx={batchIdx} />
      ))}
    </div>
  );
}

function ThreeDSkillBatchRow({ batch, batchIdx }: { key?: React.Key; batch: Skill[]; batchIdx: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 88%", "center 45%"]
  });

  const rotateX = useTransform(
    scrollYProgress,
    [0, 1],
    [batchIdx % 2 === 0 ? 40 : -40, 0]
  );
  const rotateY = useTransform(
    scrollYProgress,
    [0, 1],
    [batchIdx % 3 === 0 ? -25 : batchIdx % 3 === 1 ? 25 : 0, 0]
  );
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <div ref={rowRef} className="[perspective:1200px]">
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          opacity,
          transformStyle: "preserve-3d"
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
      >
        {batch.map((skill) => (
          <TiltCard key={skill.name} className="p-5 rounded-2xl glass-card hover:border-white relative group flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-2 font-mono gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-sm font-semibold text-white tracking-wide">{skill.name}</span>
                </div>
                <span className="text-[10px] font-mono tracking-wider font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  {skill.status}
                </span>
              </div>

              <p className="text-[11px] text-[#8A8A8A] mb-4 min-h-[2.5rem] line-clamp-2 leading-relaxed">
                {skill.description}
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#262626]">
              <div className="flex items-center gap-1.5" title={`${skill.rating}/5 Mastery Rating`}>
                {[1, 2, 3, 4, 5].map((seg) => (
                  <div 
                    key={seg} 
                    className={`h-1.5 w-5 sm:w-6 rounded-full transition-all duration-300 ${
                      seg <= skill.rating 
                        ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]" 
                        : "bg-[#222222]"
                    }`} 
                  />
                ))}
              </div>
              <span className="text-[10px] font-mono uppercase text-[#A3A3A3] font-medium tracking-wider bg-[#000000] px-2.5 py-0.5 rounded-md border border-[#262626]">
                {skill.tag}
              </span>
            </div>
          </TiltCard>
        ))}
      </motion.div>
    </div>
  );
}

// =========================================================
// 3D SCROLL & HIGH-FIDELITY HUD OVERLAYS (Professional 3D)
// =========================================================

interface ThreeDScrollSectionProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

function ThreeDScrollSection({ children, id, className = "" }: ThreeDScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    let animId: number;

    const update3DTransform = () => {
      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        const vh = window.innerHeight;

        // Active perspective calculation zone
        if (rect.bottom > -150 && rect.top < vh + 150) {
          const centerOffset = (rect.top + rect.height / 2 - vh / 2) / (vh / 2);
          const clampedOffset = Math.max(-1.2, Math.min(1.2, centerOffset));

          // Rock-solid focal scale & opacity without wobbly 3D skew or rotate
          const scale = 1 - Math.min(0.025, Math.pow(Math.abs(clampedOffset), 2) * 0.025);
          const opacity = 1 - Math.min(0.12, Math.pow(Math.abs(clampedOffset), 1.8) * 0.18);

          setTransformStyle({
            transform: `scale(${scale.toFixed(3)})`,
            opacity: Math.max(0.4, opacity).toFixed(2),
            transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s linear",
            willChange: "transform, opacity",
          });
        }
      }
      animId = requestAnimationFrame(update3DTransform);
    };

    animId = requestAnimationFrame(update3DTransform);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      ref={containerRef}
      id={id}
      style={transformStyle}
      className={`relative ${className}`}
    >
      {children}
    </div>
  );
}

// Boilerlab Floating Scroll Telemetry Controller Bar
function BoilerlabScrollTelemetryBar({ 
  activeSection, 
  onNavigate 
}: { 
  activeSection: string; 
  onNavigate: (sectionId: string) => void; 
}) {
  const [velocity, setVelocity] = useState(0);
  const [direction, setDirection] = useState<"UP" | "DOWN" | "IDLE">("IDLE");
  const [progress, setProgress] = useState(0);
  const lastScrollYRef = useRef(0);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = totalHeight > 0 ? Math.min(100, Math.max(0, (currentY / totalHeight) * 100)) : 0;
      const diff = currentY - lastScrollYRef.current;
      
      setProgress(pct);
      setVelocity(diff);

      if (Math.abs(diff) > 0.5) {
        setDirection(diff > 0 ? "DOWN" : "UP");
        if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
        idleTimeoutRef.current = setTimeout(() => {
          setDirection("IDLE");
          setVelocity(0);
        }, 300);
      }
      lastScrollYRef.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    };
  }, []);

  const sections = ["home", "about", "skills", "projects", "contact"];
  const currentSecIndex = sections.indexOf(activeSection) + 1;

  return (
    <motion.div 
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5, type: "spring", stiffness: 280, damping: 24 }}
      className="hidden md:flex fixed bottom-5 left-1/2 -translate-x-1/2 z-40 pointer-events-auto items-center gap-3 px-4 py-2.5 bg-[#0A0A0A] border border-[#262626] rounded-full font-mono text-[10px] select-none max-w-[95vw] overflow-x-auto"
    >
      {/* Scroll Direction Indicator & Pulse */}
      <div className="flex items-center gap-2 shrink-0 pr-2 border-r border-[#262626]">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <span className="font-bold tracking-wider uppercase text-[9px] text-[#EDEDED]">
          {direction === "DOWN" && "â–¼ SCROLLING DOWN"}
          {direction === "UP" && "â–² SCROLLING UP"}
          {direction === "IDLE" && "â— INERTIA LOCKED"}
        </span>
      </div>

      {/* Real-time Velocity Meter */}
      <div className="hidden sm:flex items-center gap-1.5 shrink-0 px-2 border-r border-[#262626] text-[#8A8A8A]">
        <Zap className="w-3 h-3 text-white" />
        <span>VEL:</span>
        <span className="font-bold text-white w-12 text-right">
          {Math.abs(Math.round(velocity * 10))} PX/S
        </span>
      </div>

      {/* Section Progress Counter */}
      <div className="flex items-center gap-1.5 shrink-0 px-2 border-r border-[#262626]">
        <span className="text-[#5C5C5C]">SEC</span>
        <span className="text-white font-bold">[{currentSecIndex.toString().padStart(2, '0')}/05]</span>
        <span className="text-[#EDEDED] font-semibold uppercase tracking-wider">{activeSection}</span>
      </div>

      {/* Interactive Micro Scroll Track */}
      <div className="flex items-center gap-2 shrink-0 w-24 sm:w-32">
        <div className="flex-1 h-1 bg-[#262626] rounded-full overflow-hidden relative">
          <div 
            className="h-full bg-white transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[9px] font-bold text-[#EDEDED] w-7 text-right">{Math.round(progress)}%</span>
      </div>

      {/* Scroll Navigation Arrows */}
      <div className="flex items-center gap-1 shrink-0 pl-1 border-l border-[#262626]">
        <button
          onClick={() => {
            const idx = sections.indexOf(activeSection);
            if (idx > 0) onNavigate(sections[idx - 1]);
          }}
          className="p-1 text-[#8A8A8A] hover:text-white hover:bg-[#262626] rounded transition-colors cursor-pointer"
          title="Scroll to previous section (Up)"
        >
          <ChevronDown className="w-3.5 h-3.5 rotate-180" />
        </button>
        <button
          onClick={() => {
            const idx = sections.indexOf(activeSection);
            if (idx < sections.length - 1) onNavigate(sections[idx + 1]);
          }}
          className="p-1 text-[#8A8A8A] hover:text-white hover:bg-[#262626] rounded transition-colors cursor-pointer"
          title="Scroll to next section (Down)"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

// Boilerlab Custom Interactive Kinetic Cursor
function BoilerlabCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.tagName === "INPUT" ||
          target.closest("button") ||
          target.closest("a") ||
          target.closest(".glass-card") ||
          target.closest(".tilt-card") ||
          target.getAttribute("role") === "button")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Outer Ring */}
      <div
        className="fixed top-0 left-0 rounded-full border border-white/60 bg-white/5 -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: isHovered ? "48px" : isClicking ? "24px" : "32px",
          height: isHovered ? "48px" : isClicking ? "24px" : "32px",
          borderColor: isHovered ? "#FFFFFF" : "rgba(255, 255, 255, 0.4)",
        }}
      />
      {/* Center Dot */}
      <div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
      />
    </div>
  );
}

// 1. TOP-LEFT HUD: 3D Compass & Vector Radar Widget
function HUDTopLeft({ scrollY, velocity }: { scrollY: number; velocity: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let width = (canvas.width = 130);
    let height = (canvas.height = 130);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const maxRadius = 40;

      // Smooth spin velocity driven by scroll momentum
      const scrollInfluence = Math.abs(velocity) * 0.003;
      rotationRef.current += 0.012 + scrollInfluence;

      // Draw crosshairs
      ctx.beginPath();
      ctx.moveTo(cx - 4, cy);
      ctx.lineTo(cx + 4, cy);
      ctx.moveTo(cx, cy - 4);
      ctx.lineTo(cx, cy + 4);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      ctx.stroke();

      // Outer tech dial
      ctx.beginPath();
      ctx.arc(cx, cy, maxRadius, 0, Math.PI * 2);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      ctx.stroke();

      // Dashed interior ring
      ctx.beginPath();
      ctx.arc(cx, cy, maxRadius - 8, 0, Math.PI * 2);
      ctx.setLineDash([2, 5]);
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.stroke();
      ctx.setLineDash([]); // Reset

      // Directional Tick Marks
      for (let i = 0; i < 360; i += 30) {
        const angle = (i * Math.PI) / 180 + rotationRef.current * 0.25;
        const x1 = cx + Math.cos(angle) * (maxRadius - 3);
        const y1 = cy + Math.sin(angle) * (maxRadius - 3);
        const x2 = cx + Math.cos(angle) * maxRadius;
        const y2 = cy + Math.sin(angle) * maxRadius;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineWidth = i % 90 === 0 ? 1.5 : 0.8;
        ctx.strokeStyle = i % 90 === 0 ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.25)";
        ctx.stroke();
      }

      // Radar beam scan line
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      const beamAngle = rotationRef.current;
      const rx = cx + Math.cos(beamAngle) * maxRadius;
      const ry = cy + Math.sin(beamAngle) * maxRadius;
      ctx.lineTo(rx, ry);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      ctx.stroke();

      // Compass text coordinate indicator
      ctx.font = "8px monospace";
      ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
      ctx.textAlign = "center";
      ctx.fillText(`ROT_H:${((scrollY * 0.15) % 360).toFixed(0)}Â°`, cx, cy + maxRadius + 14);

      animFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animFrame);
  }, [scrollY, velocity]);

  return (
    <div className="flex items-center gap-3 bg-[#0A0A0A] p-3.5 rounded-2xl border border-[#262626] transition-all duration-300 hover:border-[#5C5C5C]">
      <canvas ref={canvasRef} className="w-[60px] h-[60px] cursor-pointer" />
      <div className="flex flex-col text-[9px] font-mono text-[#8A8A8A] text-left">
        <div className="text-[10px] text-white/90 font-bold tracking-widest uppercase">SUDIN_AI_3D</div>
        <div className="text-white font-semibold uppercase tracking-wider mt-0.5">3D ENGINE RUNNING</div>
        <div className="mt-1 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          <span>FPS_STABLE: 60.0</span>
        </div>
      </div>
    </div>
  );
}

// 2. TOP-RIGHT HUD: Dynamic Memory Stream Logs
function HUDTopRight({ scrollY, velocity }: { scrollY: number; velocity: number }) {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const initialLogs = Array.from({ length: 5 }, () => generateHexLog());
    setLogs(initialLogs);
  }, []);

  // Accelerate data log scrolling when the user scrolls the page
  useEffect(() => {
    if (Math.abs(velocity) > 8) {
      setLogs(prev => {
        const next = [...prev.slice(1), generateHexLog()];
        return next;
      });
    }
  }, [scrollY, velocity]);

  // Gentle idle cycle updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => {
        const next = [...prev.slice(1), generateHexLog()];
        return next;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const generateHexLog = () => {
    const addr = "0x" + Math.floor(Math.random() * 65535).toString(16).toUpperCase().padStart(4, "0");
    const val = Math.floor(Math.random() * 255).toString(16).toUpperCase().padStart(2, "0");
    const nodes = ["WEB", "CSIT", "CFC", "PRJ", "CON", "AI"];
    const node = nodes[Math.floor(Math.random() * nodes.length)];
    return `${addr} ${node}::[${val}] STREAM_OK`;
  };

  return (
    <div className="flex flex-col gap-1 bg-[#0A0A0A] p-3.5 rounded-2xl border border-[#262626] w-full max-w-[200px] font-mono text-[9px] text-[#8A8A8A] transition-all duration-300 hover:border-[#5C5C5C]">
      <div className="flex items-center justify-between border-b border-[#262626] pb-1.5 mb-1.5">
        <span className="text-white/80 font-bold tracking-wider text-left">3D_BUS_CONTROLLER</span>
        <span className="text-white font-bold uppercase">REG:F3</span>
      </div>
      {logs.map((log, idx) => (
        <div key={idx} className={`flex justify-between ${idx === logs.length - 1 ? "text-white font-semibold" : ""}`}>
          <span>{log.split(" ")[0]}</span>
          <span className="text-[#5C5C5C] font-semibold">{log.split(" ")[1]}</span>
          <span className="text-[#8A8A8A]">{log.split(" ")[2]}</span>
        </div>
      ))}
    </div>
  );
}

// 3. BOTTOM-LEFT HUD: Real-time Coordinate Telemetry
function HUDBottomLeft({ scrollY, velocity, percent, activeSection }: { scrollY: number; velocity: number; percent: number; activeSection: string }) {
  return (
    <div className="flex flex-col gap-1.5 bg-[#0A0A0A] p-3.5 rounded-2xl border border-[#262626] w-full max-w-[200px] font-mono text-[9px] text-[#8A8A8A] transition-all duration-300 hover:border-[#5C5C5C]">
      <div className="flex items-center justify-between border-b border-[#262626] pb-1.5 mb-1.5">
        <span className="text-white/80 font-bold tracking-wider text-left">XYZ_COORDINATES</span>
        <span className="text-white font-semibold uppercase">{activeSection}</span>
      </div>
      <div className="grid grid-cols-2 gap-y-1 gap-x-4 text-left">
        <div className="flex justify-between">
          <span>Y_COOR:</span>
          <span className="text-white font-semibold">{scrollY.toFixed(0)}px</span>
        </div>
        <div className="flex justify-between">
          <span>Y_VELO:</span>
          <span className="text-white font-semibold">{velocity.toFixed(0)}px/s</span>
        </div>
        <div className="flex justify-between">
          <span>Z_PERS:</span>
          <span className="text-white font-semibold">-{Math.min(130, Math.abs(velocity) * 0.12).toFixed(1)}px</span>
        </div>
        <div className="flex justify-between">
          <span>SCR_PCT:</span>
          <span className="text-white font-semibold">{percent.toFixed(1)}%</span>
        </div>
        <div className="flex justify-between col-span-2 border-t border-[#262626] pt-1 mt-1">
          <span>PITCH_X:</span>
          <span className="text-[#EDEDED] font-semibold">{(Math.sin(scrollY * 0.0018) * 14).toFixed(2)}Â°</span>
        </div>
      </div>
      <div className="h-1 w-full bg-[#262626] rounded-full overflow-hidden mt-1.5 relative">
        <div 
          className="h-full bg-white transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

// 4. BOTTOM-RIGHT HUD: 3D Orbiting Wireframe Cube Canvas
function HUDBottomRight({ scrollY, velocity }: { scrollY: number; velocity: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const angles = useRef({ x: 0.25, y: 0.35, z: 0.15 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let width = (canvas.width = 130);
    let height = (canvas.height = 130);

    // Cube vertices
    const vertices = [
      { x: -1, y: -1, z: -1 },
      { x: 1, y: -1, z: -1 },
      { x: 1, y: 1, z: -1 },
      { x: -1, y: 1, z: -1 },
      { x: -1, y: -1, z: 1 },
      { x: 1, y: -1, z: 1 },
      { x: 1, y: 1, z: 1 },
      { x: -1, y: 1, z: 1 }
    ];

    // Connect edges
    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // Back Face
      [4, 5], [5, 6], [6, 7], [7, 4], // Front Face
      [0, 4], [1, 5], [2, 6], [3, 7]  // Connectors
    ];

    const rotatePoint = (pt: { x: number; y: number; z: number }, ax: number, ay: number, az: number) => {
      // Rotation around X axis
      let y1 = pt.y * Math.cos(ax) - pt.z * Math.sin(ax);
      let z1 = pt.y * Math.sin(ax) + pt.z * Math.cos(ax);

      // Rotation around Y axis
      let x2 = pt.x * Math.cos(ay) + z1 * Math.sin(ay);
      let z2 = -pt.x * Math.sin(ay) + z1 * Math.cos(ay);

      // Rotation around Z axis
      let x3 = x2 * Math.cos(az) - y1 * Math.sin(az);
      let y3 = x2 * Math.sin(az) + y1 * Math.cos(az);

      return { x: x3, y: y3, z: z2 };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const cubeSize = 24; // Side length scale factor

      // Torque effect from page scroll velocity
      const scrollTorque = Math.abs(velocity) * 0.0035;
      angles.current.x += 0.008 + scrollTorque * 0.35;
      angles.current.y += 0.012 + scrollTorque * 0.25;
      angles.current.z += 0.005;

      const projected: { x: number; y: number }[] = [];

      // Perspective projection
      vertices.forEach(v => {
        const r = rotatePoint(v, angles.current.x, angles.current.y, angles.current.z);
        const distance = 2.8;
        const perspective = distance / (distance + r.z);
        const px = cx + r.x * cubeSize * perspective;
        const py = cy + r.y * cubeSize * perspective;
        projected.push({ x: px, y: py });
      });

      // Draw wireframe edges
      edges.forEach(([p1, p2]) => {
        const pt1 = projected[p1];
        const pt2 = projected[p2];

        ctx.beginPath();
        ctx.moveTo(pt1.x, pt1.y);
        ctx.lineTo(pt2.x, pt2.y);
        ctx.lineWidth = 1.1;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
        ctx.stroke();
      });

      // Draw vertices
      projected.forEach(pt => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
        ctx.stroke();
      });

      // Floating dynamic tag
      ctx.font = "8px monospace";
      ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
      ctx.textAlign = "center";
      ctx.fillText(`AX_XYZ:OK`, cx, cy + 42);

      animFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animFrame);
  }, [scrollY, velocity]);

  return (
    <div className="flex items-center gap-3 bg-[#0A0A0A] p-3.5 rounded-2xl border border-[#262626] transition-all duration-300 hover:border-[#5C5C5C]">
      <div className="flex flex-col text-[9px] font-mono text-[#8A8A8A] items-end">
        <div className="text-[10px] text-white/90 font-bold tracking-widest uppercase">3D_ORBIT_CUBE</div>
        <div className="text-white font-semibold uppercase tracking-wider mt-0.5">SCROLL_DRIVE_TORQUE</div>
        <div className="mt-1 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>TORQUE: {Math.max(1, (Math.abs(velocity) / 8)).toFixed(1)}x</span>
        </div>
      </div>
      <canvas ref={canvasRef} className="w-[60px] h-[60px] cursor-pointer" />
    </div>
  );
}

// Fullscreen Pop-Up HUD diagnostic controller
function HUDDiagnosticsModal({ activeSection, onClose }: { activeSection: string; onClose: () => void }) {
  const [scrollYValue, setScrollYValue] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let animFrame: number;

    const trackScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = performance.now();
      const dt = currentTime - lastTime;
      
      const dy = currentScrollY - lastScrollY;
      const velocity = dt > 0 ? (dy / dt) * 1000 : 0; // px/second

      setScrollVelocity(prev => prev + (velocity - prev) * 0.12);
      setScrollYValue(currentScrollY);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (currentScrollY / docHeight) * 100 : 0;
      setScrollPercent(percent);

      lastScrollY = currentScrollY;
      lastTime = currentTime;
      
      animFrame = requestAnimationFrame(trackScroll);
    };

    animFrame = requestAnimationFrame(trackScroll);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#000000]/90 backdrop-blur-xl z-50 flex items-start sm:items-center justify-center p-3 sm:p-6 overflow-y-auto font-mono">
      <div className="relative w-full max-w-3xl bg-[#0A0A0A] border-2 border-[#262626] rounded-3xl p-6 md:p-8 flex flex-col gap-6 text-left my-auto">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between border-b border-[#262626] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
            <h3 className="text-base font-bold text-white uppercase tracking-widest">SUDIN_AI_HUD_MONITOR::ONLINE</h3>
          </div>
          <button 
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg border border-[#262626] text-white hover:bg-[#262626] hover:text-[#EDEDED] transition-all text-[11px] uppercase tracking-wider font-bold cursor-pointer"
          >
            [X] Close System
          </button>
        </div>

        {/* Info Box */}
        <div className="p-4 rounded-xl border border-[#262626] bg-[#000000] text-xs text-[#8A8A8A] leading-relaxed">
          <span className="font-bold text-white mr-2">SYSTEM SPECS:</span> 
          This real-time telemetry panel monitors active coordinates, virtual browser scroll speed, 3D render queues, and local heap registers. Drag your page up/down to see coordinates update instantly!
        </div>

        {/* 2x2 Grid of 3D Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch justify-items-center">
          <div className="w-full flex justify-center">
            <HUDTopLeft scrollY={scrollYValue} velocity={scrollVelocity} />
          </div>
          <div className="w-full flex justify-center">
            <HUDTopRight scrollY={scrollYValue} velocity={scrollVelocity} />
          </div>
          <div className="w-full flex justify-center">
            <HUDBottomLeft 
              scrollY={scrollYValue} 
              velocity={scrollVelocity} 
              percent={scrollPercent} 
              activeSection={activeSection} 
            />
          </div>
          <div className="w-full flex justify-center">
            <HUDBottomRight scrollY={scrollYValue} velocity={scrollVelocity} />
          </div>
        </div>

        {/* Grid Stats Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#262626] pt-4 text-[10px] text-[#5C5C5C]">
          <div>BUS_NODE: <span className="text-[#EDEDED] font-bold">ACMS_KTM_NEPAL</span></div>
          <div>CPU_ALLOC: <span className="text-[#EDEDED] font-bold">18.42%</span></div>
          <div>MEM_HEAP: <span className="text-white font-bold">ACTIVE_OK (1.4MB)</span></div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// 3D HOLOGRAM PROJECT INSPECTOR MODAL (Pop-Up / Pop-Out)
// ---------------------------------------------------------

interface HologramInspectorProps {
  project: Project;
  onClose: () => void;
}

function HologramInspector({ project, onClose }: HologramInspectorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [orbitSpeed, setOrbitSpeed] = useState<number>(3); // 1 to 10
  const [zoomScale, setZoomScale] = useState<number>(100); // 50 to 150
  const [visualMode, setVisualMode] = useState<"laser" | "atomic" | "mesh">("mesh");
  const [particleCount, setParticleCount] = useState<number>(25);

  const angles = useRef({ x: 0.3, y: 0.4 });
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  // Real-time drag metrics for HUD panel
  const [dragLogs, setDragLogs] = useState<string[]>([]);

  // Push telemetry logs on drag
  const logDragEvent = (px: number, py: number) => {
    const timestamp = new Date().toLocaleTimeString();
    const formatted = `[${timestamp}] PITCH: ${(px * 180 / Math.PI).toFixed(1)}Â° | YAW: ${(py * 180 / Math.PI).toFixed(1)}Â°`;
    setDragLogs(prev => [formatted, ...prev.slice(0, 3)]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let width = (canvas.width = 460);
    let height = (canvas.height = 360);

    // Dynamic 3D Objects Setup based on project types
    // Vertices coordinates (X, Y, Z)
    let vertices: { x: number; y: number; z: number; label?: string }[] = [];
    let edges: { from: number; to: number; color?: string }[] = [];

    if (project.id === "crud") {
      // RELATIONAL DATABASE GRAPH (4 Tables floating as cuboids)
      // Table 1: Users (Top Left)
      vertices = [
        { x: -1.2, y: -0.8, z: -0.5, label: "user_id" },
        { x: -0.4, y: -0.8, z: -0.5, label: "user_name" },
        { x: -0.4, y: -0.2, z: -0.5 },
        { x: -1.2, y: -0.2, z: -0.5, label: "user_email" },
        { x: -1.2, y: -0.8, z: 0.1 },
        { x: -0.4, y: -0.8, z: 0.1 },
        { x: -0.4, y: -0.2, z: 0.1 },
        { x: -1.2, y: -0.2, z: 0.1 },

        // Table 2: Posts (Top Right)
        { x: 0.4, y: -0.8, z: -0.5, label: "post_id" },
        { x: 1.2, y: -0.8, z: -0.5, label: "title" },
        { x: 1.2, y: -0.2, z: -0.5 },
        { x: 0.4, y: -0.2, z: -0.5, label: "post_user_id" },
        { x: 0.4, y: -0.8, z: 0.1 },
        { x: 1.2, y: -0.8, z: 0.1 },
        { x: 1.2, y: -0.2, z: 0.1 },
        { x: 0.4, y: -0.2, z: 0.1 },

        // Table 3: Logs (Bottom)
        { x: -0.4, y: 0.4, z: -0.3, label: "log_id" },
        { x: 0.4, y: 0.4, z: -0.3, label: "timestamp" },
        { x: 0.4, y: 1.0, z: -0.3 },
        { x: -0.4, y: 1.0, z: -0.3, label: "action" },
        { x: -0.4, y: 0.4, z: 0.3 },
        { x: 0.4, y: 0.4, z: 0.3 },
        { x: 0.4, y: 1.0, z: 0.3 },
        { x: -0.4, y: 1.0, z: 0.3 }
      ];

      // Edges connecting Cuboids
      edges = [
        // Table 1
        { from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 0 },
        { from: 4, to: 5 }, { from: 5, to: 6 }, { from: 6, to: 7 }, { from: 7, to: 4 },
        { from: 0, to: 4 }, { from: 1, to: 5 }, { from: 2, to: 6 }, { from: 3, to: 7 },
        
        // Table 2
        { from: 8, to: 9 }, { from: 9, to: 10 }, { from: 10, to: 11 }, { from: 11, to: 8 },
        { from: 12, to: 13 }, { from: 13, to: 14 }, { from: 14, to: 15 }, { from: 15, to: 12 },
        { from: 8, to: 12 }, { from: 9, to: 13 }, { from: 10, to: 14 }, { from: 11, to: 15 },

        // Table 3
        { from: 16, to: 17 }, { from: 17, to: 18 }, { from: 18, to: 19 }, { from: 19, to: 16 },
        { from: 20, to: 21 }, { from: 21, to: 22 }, { from: 22, to: 23 }, { from: 23, to: 20 },
        { from: 16, to: 20 }, { from: 17, to: 21 }, { from: 18, to: 22 }, { from: 19, to: 23 },

        // Foreign Key Relationships (connecting table nodes)
        {from: 11, to: 0, color: "#EDEDED"}, // post.post_user_id -> users.user_id
        {from: 16, to: 1, color: "#8A8A8A"}  // logs.log_id -> users.user_name
      ];
    } else if (project.category === "ai" || project.id === "gesture") {
      // 3D HAND SKELETON (representing Python Hand gesture trackers)
      vertices = [
        { x: 0, y: 1.0, z: 0, label: "Wrist Node" }, // Wrist (0)
        
        // Thumb (1, 2, 3)
        { x: -0.4, y: 0.5, z: 0.1 },
        { x: -0.7, y: 0.2, z: 0.1 },
        { x: -0.9, y: -0.1, z: 0.1, label: "Thumb Tip" },

        // Index Finger (4, 5, 6)
        { x: -0.2, y: 0.2, z: -0.1 },
        { x: -0.3, y: -0.3, z: -0.1 },
        { x: -0.35, y: -0.8, z: -0.1, label: "Index Tip" },

        // Middle Finger (7, 8, 9)
        { x: 0, y: 0.15, z: -0.2 },
        { x: 0, y: -0.4, z: -0.2 },
        { x: 0, y: -0.95, z: -0.2, label: "Middle Tip" },

        // Ring Finger (10, 11, 12)
        { x: 0.2, y: 0.2, z: -0.1 },
        { x: 0.25, y: -0.3, z: -0.1 },
        { x: 0.28, y: -0.85, z: -0.1, label: "Ring Tip" },

        // Pinky Finger (13, 14, 15)
        { x: 0.4, y: 0.35, z: 0 },
        { x: 0.5, y: -0.1, z: 0 },
        { x: 0.55, y: -0.55, z: 0, label: "Pinky Tip" }
      ];

      edges = [
        // Palm connection bases
        { from: 0, to: 1 }, { from: 0, to: 4 }, { from: 0, to: 7 }, { from: 0, to: 10 }, { from: 0, to: 13 },
        // Connectors across knuckles
        { from: 1, to: 4 }, { from: 4, to: 7 }, { from: 7, to: 10 }, { from: 10, to: 13 },
        // Thumb line
        { from: 1, to: 2 }, { from: 2, to: 3 },
        // Index line
        { from: 4, to: 5 }, { from: 5, to: 6 },
        // Middle line
        { from: 7, to: 8 }, { from: 8, to: 9 },
        // Ring line
        { from: 10, to: 11 }, { from: 11, to: 12 },
        // Pinky line
        { from: 13, to: 14 }, { from: 14, to: 15 }
      ];
    } else if (project.category === "c") {
      // 3D DOUBLE HELIX SPIRAL (low level procedural data registers)
      const segments = 16;
      for (let i = 0; i < segments; i++) {
        const theta = (i / segments) * Math.PI * 4;
        const y = -1.2 + (i / segments) * 2.4;
        
        // Strand 1
        vertices.push({
          x: Math.cos(theta) * 0.7,
          y: y,
          z: Math.sin(theta) * 0.7,
          label: i % 4 === 0 ? `REG_0x${i.toString(16).toUpperCase()}` : undefined
        });

        // Strand 2 (180deg out of phase)
        vertices.push({
          x: Math.cos(theta + Math.PI) * 0.7,
          y: y,
          z: Math.sin(theta + Math.PI) * 0.7
        });

        // Add backbone helices
        if (i > 0) {
          edges.push({ from: (i - 1) * 2, to: i * 2, color: "#EDEDED" });
          edges.push({ from: (i - 1) * 2 + 1, to: i * 2 + 1, color: "#8A8A8A" });
        }

        // Add crossbars
        edges.push({ from: i * 2, to: i * 2 + 1, color: "rgba(255, 255, 255, 0.45)" });
      }
    } else {
      // CORE LEADERSHIP/GENERAL CONSTELLATION NODE MESH
      vertices = [
        { x: 0, y: 0, z: 0, label: "Core Node" }, // Central node
        { x: -1.0, y: -0.6, z: -0.5, label: "Tech Sprints" },
        { x: 1.0, y: -0.6, z: -0.5, label: "Bootcamps" },
        { x: 0.8, y: 0.8, z: -0.4, label: "Nepal CFC" },
        { x: -0.8, y: 0.8, z: -0.4, label: "ACMS Synergies" },
        { x: 0, y: -1.1, z: 0.8, label: "Student Rep" },
        { x: 0, y: 1.1, z: 0.8, label: "Open-Source" }
      ];

      edges = [
        { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 0, to: 3 }, { from: 0, to: 4 }, { from: 0, to: 5 }, { from: 0, to: 6 },
        { from: 1, to: 4 }, { from: 4, to: 6 }, { from: 6, to: 3 }, { from: 3, to: 2 }, { from: 2, to: 5 }, { from: 5, to: 1 }
      ];
    }

    // Interactive floating ambient background particle array
    const ambientParticles: { x: number; y: number; z: number; speed: number }[] = [];
    for (let i = 0; i < 40; i++) {
      ambientParticles.push({
        x: (Math.random() - 0.5) * 3,
        y: (Math.random() - 0.5) * 3,
        z: (Math.random() - 0.5) * 3,
        speed: 0.005 + Math.random() * 0.012
      });
    }

    const rotatePoint = (pt: { x: number; y: number; z: number }, ax: number, ay: number) => {
      // Rotate around X-axis
      let y1 = pt.y * Math.cos(ax) - pt.z * Math.sin(ax);
      let z1 = pt.y * Math.sin(ax) + pt.z * Math.cos(ax);

      // Rotate around Y-axis
      let x2 = pt.x * Math.cos(ay) + z1 * Math.sin(ay);
      let z2 = -pt.x * Math.sin(ay) + z1 * Math.cos(ay);

      return { x: x2, y: y1, z: z2 };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Handle Resize dynamically
      if (canvas.width !== canvas.clientWidth) {
        width = canvas.width = canvas.clientWidth;
        height = canvas.height = canvas.clientHeight;
      }

      // Rotate automated orbit if not dragging
      if (!isDragging.current) {
        angles.current.y += (orbitSpeed * 0.002);
      }

      // Live hand bending animation if gesture project is active
      let animatedVertices = vertices;
      if (project.category === "ai" || project.id === "gesture") {
        const time = Date.now() * 0.0025;
        animatedVertices = vertices.map((v, idx) => {
          // If it is a tip of finger (labels match tip)
          if (v.label && v.label.includes("Tip")) {
            return {
              ...v,
              y: v.y + Math.sin(time + idx) * 0.12,
              z: v.z + Math.cos(time + idx) * 0.08
            };
          }
          return v;
        });
      }

      // Draw circular scope markings in background
      ctx.beginPath();
      ctx.arc(cx, cy, (zoomScale * 1.5), 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, (zoomScale * 0.8), 0, Math.PI * 2);
      ctx.setLineDash([2, 10]);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.stroke();
      ctx.setLineDash([]); // Reset

      // Project and draw ambient particles
      ambientParticles.forEach(p => {
        p.y += p.speed; // Drift upwards
        if (p.y > 1.5) p.y = -1.5;

        const rotated = rotatePoint(p, angles.current.x, angles.current.y);
        const distance = 3.5;
        const perspective = distance / (distance + rotated.z);
        
        const px = cx + rotated.x * zoomScale * perspective;
        const py = cy + rotated.y * zoomScale * perspective;

        if (px > 0 && px < width && py > 0 && py < height && rotated.z < 1.5) {
          ctx.beginPath();
          ctx.arc(px, py, 1.2 * perspective, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, 0.45 * perspective)})`;
          ctx.fill();
        }
      });

      const projected: { x: number; y: number; z: number; label?: string }[] = [];

      // Project vertices to 2D
      animatedVertices.forEach(v => {
        const rotated = rotatePoint(v, angles.current.x, angles.current.y);
        const distance = 3.5;
        const perspective = distance / (distance + rotated.z);
        const px = cx + rotated.x * zoomScale * perspective;
        const py = cy + rotated.y * zoomScale * perspective;
        projected.push({ x: px, y: py, z: rotated.z, label: v.label });
      });

      // Draw edges
      if (visualMode !== "atomic") {
        edges.forEach(e => {
          const pt1 = projected[e.from];
          const pt2 = projected[e.to];

          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);
          
          // Edges are thicker when closer
          const avgZ = (pt1.z + pt2.z) / 2;
          const alpha = Math.max(0.08, 0.55 - avgZ * 0.25);
          ctx.lineWidth = Math.max(0.8, 1.6 - avgZ * 0.4);
          ctx.strokeStyle = e.color || `rgba(255, 255, 255, ${alpha})`;
          ctx.stroke();
        });
      }

      // Draw vertices
      projected.forEach(pt => {
        const alpha = Math.max(0.2, 0.95 - pt.z * 0.35);
        const radius = Math.max(2.5, 5 - pt.z * 1.5);

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
        
        // Highlight active labelled nodes
        if (pt.label) {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, radius + 3, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.35})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Label text
          ctx.font = "8px monospace";
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.textAlign = "left";
          ctx.fillText(pt.label, pt.x + 8, pt.y + 3);
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();
        }
      });

      // Overlay matrix grid laser scans in center of hologram scope
      if (visualMode === "laser") {
        const laserY = cy + Math.sin(Date.now() * 0.0035) * (zoomScale * 1.2);
        ctx.beginPath();
        ctx.moveTo(cx - zoomScale * 1.4, laserY);
        ctx.lineTo(cx + zoomScale * 1.4, laserY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
        ctx.stroke();
      }

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
    };
  }, [project, orbitSpeed, zoomScale, visualMode, particleCount]);

  // Handle Drag-to-rotate interaction
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    previousMousePosition.current = {
      x: e.clientX,
      y: e.clientY
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - previousMousePosition.current.x;
    const deltaY = e.clientY - previousMousePosition.current.y;

    angles.current.y += deltaX * 0.012;
    angles.current.x += deltaY * 0.012;

    // Limit pitch angle to prevent flipping
    angles.current.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, angles.current.x));

    previousMousePosition.current = {
      x: e.clientX,
      y: e.clientY
    };

    logDragEvent(angles.current.x, angles.current.y);
</svg>`;