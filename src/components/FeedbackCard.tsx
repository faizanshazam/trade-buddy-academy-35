
import React from "react";
import { Linkedin, Twitter } from "lucide-react";

export type FeedbackCardProps = {
  name: string;
  avatar: string;
  platform: "linkedin" | "x";
  content: string;
  url: string;
};

const FeedbackCard: React.FC<FeedbackCardProps> = ({
  name,
  avatar,
  platform,
  content,
  url,
}) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="group card-feedback block bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-200 hover:scale-105 animate-fade-in"
    style={{
      margin: "0 auto",
      overflow: "hidden",
      width: "100%",
      maxWidth: 480,
      padding: 0,
      minHeight: 110,
      // Adaptive height!
    }}
  >
    <div className="flex items-center gap-3 p-5 pb-3">
      <img
        src={avatar}
        alt={name}
        className="w-12 h-12 rounded-full border border-gray-200"
      />
      <div>
        <p className="font-semibold text-gray-800">{name}</p>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          {platform === "linkedin" ? (
            <Linkedin className="w-4 h-4 text-blue-700" />
          ) : (
            <Twitter className="w-4 h-4 text-blue-500" />
          )}
          <span className="ml-1">
            {platform === "linkedin" ? "LinkedIn" : "X"}
          </span>
        </div>
      </div>
    </div>
    <div className="px-5 pb-6">
      <p className="text-gray-600 text-[15px] break-words leading-relaxed">
        {content}
      </p>
    </div>
  </a>
);

export default FeedbackCard;
