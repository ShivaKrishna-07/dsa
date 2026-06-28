import {
  Binary,
  Brackets,
  Check,
  Copy,
  ExternalLink,
  GitBranch,
  GitFork,
  Home,
  Layers3,
  ListTree,
  Moon,
  Network,
  PanelTop,
  Route,
  Search,
  Sun,
  Table2,
  TextCursorInput,
  TreePine,
  Zap
} from "lucide-react";

export const iconMap = {
  Binary,
  Brackets,
  Check,
  Copy,
  ExternalLink,
  GitBranch,
  GitFork,
  Home,
  Layers3,
  ListTree,
  Moon,
  Network,
  PanelTop,
  Route,
  Search,
  Sun,
  Table2,
  TextCursorInput,
  TreePine,
  Zap
};

export function TopicIcon({ name, className }) {
  const Icon = iconMap[name] || Brackets;
  return <Icon className={className} aria-hidden="true" />;
}
