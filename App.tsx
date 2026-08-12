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
