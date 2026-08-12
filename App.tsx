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
