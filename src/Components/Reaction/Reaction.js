import React, { useState, useEffect } from "react";
import { Angry, Heart, Laugh, ThumbsUp } from "lucide-react";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../Firebase/Firebase";

export default function Reaction({ recipeId }) {
  const [user] = useAuthState(auth);

  const [counts, setCounts] = useState({
    thumbsUp: 0,
    heart: 0,
    laugh: 0,
    angry: 0,
    thumbsUpTotal: 0,
    heartTotal: 0,
    laughTotal: 0,
    angryTotal: 0,
    total: 0,
  });

  const [hovered, setHovered] = useState(null);
  const [userReacted, setUserReacted] = useState(false); 
  const [userReactionType, setUserReactionType] = useState(null); 

  useEffect(() => {
    const userReaction = localStorage.getItem(`reaction_${recipeId}`);
    if (userReaction) {
      setUserReacted(true);
      setUserReactionType(userReaction);
    }
  }, [recipeId]);

  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/reactions/reactions/${recipeId}`
        );
        if (response.data.reactions.length > 0) {
          const reactionData = response.data.reactions[0];
          setCounts({
            thumbsUp: reactionData.thumbsUp,
            heart: reactionData.heart,
            laugh: reactionData.laugh,
            angry: reactionData.angry,
            thumbsUpTotal: response.data.thumbsUpTotal,
            heartTotal: response.data.heartTotal,
            laughTotal: response.data.laughTotal,
            angryTotal: response.data.angryTotal,
            total: response.data.total,
          });
        }
      } catch (error) {
        console.error("Error fetching reactions:", error);
      }
    };

    fetchReactions();
  }, [recipeId]);

  const postReaction = async (reactionType) => {
    if (!user || userReacted) return; 
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/reactions/reactions",
        {
          recipeId,
          thumbsUp: reactionType === "thumbsUp" ? 1 : 0,
          heart: reactionType === "heart" ? 1 : 0,
          laugh: reactionType === "laugh" ? 1 : 0,
          angry: reactionType === "angry" ? 1 : 0,
        }
      );

      if (response.status === 201 || response.status === 200) {
        setCounts((prevCounts) => ({
          ...prevCounts,
          [reactionType]: prevCounts[reactionType] + 1,
          [`${reactionType}Total`]: prevCounts[`${reactionType}Total`] + 1,
          total: prevCounts.total + 1,
        }));
        setUserReacted(true); 
        setUserReactionType(reactionType); 

        localStorage.setItem(`reaction_${recipeId}`, reactionType);
      }
    } catch (error) {
      console.error("Error posting reaction:", error);
    }
  };

  return (
    <div className="flex justify-start items-center gap-1">
      <div
        className={`relative cursor-pointer ${
          userReacted && userReactionType === "thumbsUp" ? "active" : ""
        }`}
        onClick={() => postReaction("thumbsUp")}
      >
        <div className=" flex flex-col  justify-center items-center">
          <ThumbsUp
            onMouseEnter={() => setHovered("thumbsUp")}
            onMouseLeave={() => setHovered(null)}
          />
          <span>{counts.thumbsUpTotal}</span>
        </div>

        {hovered === "thumbsUp" && (
          <span className="tooltip"> {counts.thumbsUpTotal}</span>
        )}
      </div>

      <div
        className={`relative cursor-pointer ${
          userReacted && userReactionType === "heart" ? "active" : ""
        }`}
        onClick={() => postReaction("heart")}
      >
        <div className=" flex flex-col  justify-center items-center">
          <Heart
            onMouseEnter={() => setHovered("heart")}
            onMouseLeave={() => setHovered(null)}
          />
          <span>{counts.heartTotal}</span>
        </div>

        {hovered === "heart" && (
          <span className="tooltip"> {counts.heartTotal}</span>
        )}
      </div>
      <div
        className={`relative cursor-pointer ${
          userReacted && userReactionType === "laugh" ? "active" : ""
        }`}
        onClick={() => postReaction("laugh")}
      >
        <div className=" flex flex-col  justify-center items-center">
          <Laugh
            onMouseEnter={() => setHovered("laugh")}
            onMouseLeave={() => setHovered(null)}
          />
          <span>{counts.laughTotal}</span>
        </div>
        {hovered === "laugh" && (
          <span className="tooltip">{counts.laughTotal}</span>
        )}
      </div>
      <div
        className={`relative cursor-pointer ${
          userReacted && userReactionType === "angry" ? "active" : ""
        }`}
        onClick={() => postReaction("angry")}
      >
        <div className=" flex flex-col  justify-center items-center">
          <Angry
            onMouseEnter={() => setHovered("angry")}
            onMouseLeave={() => setHovered(null)}
          />
          <span>{counts.angryTotal}</span>
        </div>

        {hovered === "angry" && (
          <span className="tooltip"> {counts.angryTotal}</span>
        )}
      </div>
      <style jsx>{`
        .tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background-color: #333;
          color: #fff;
          padding: 5px 10px;
          border-radius: 4px;
          white-space: nowrap;
          z-index: 10;
        }
        .active {
          color: red; 
        }
        .disabled {
          opacity: 0.5; 
          pointer-events: none; 
        }
      `}</style>
    </div>
  );
}
