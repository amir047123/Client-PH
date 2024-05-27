import React, { useState, useEffect } from "react";
import { Angry, Heart, Laugh, ThumbsUp } from "lucide-react";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../Firebase/Firebase";

export default function Reaction({ recipeId }) {
  const [user] = useAuthState(auth);


  // State variables to manage reaction counts, user's reaction status, and hovered reaction type
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


    // Effect to check if the user has reacted to the recipe upon component mount
  useEffect(() => {
    const fetchUserReaction = async () => {
      if (user) {
        const userReaction = localStorage.getItem(`reaction_${recipeId}`);
        if (userReaction) {
          setUserReacted(true);
          setUserReactionType(userReaction);
        }
      }
    };
    fetchUserReaction();
  }, [recipeId, user]);



    // Effect to fetch reaction counts from the server upon component mount
  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const response = await axios.get(
          `https://serverrecipesharing.niroghealthplus.com/api/v1/reactions/reactions/${recipeId}`
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


    // Function to post user reaction to the server
  const postReaction = async (reactionType) => {
    if (!user) return;

    const userReaction = localStorage.getItem(`reaction_${recipeId}`);
    let action = "add";

    if (userReacted && userReactionType === reactionType) {
      action = "remove";
    } else if (userReacted && userReactionType !== reactionType) {
      action = "update";
    }

    try {
      const response = await axios.post(
        "https://serverrecipesharing.niroghealthplus.com/api/v1/reactions/reactions",
        {
          recipeId,
          userId: user.uid,
          reactionType,
          action,
        }
      );

      if (response.status === 201 || response.status === 200) {
        const newCounts = { ...counts };

        if (action === "add") {
          newCounts[reactionType]++;
          newCounts[`${reactionType}Total`]++;
          newCounts.total++;
          setUserReacted(true);
          setUserReactionType(reactionType);
          localStorage.setItem(`reaction_${recipeId}`, reactionType);
        } else if (action === "remove") {
          newCounts[reactionType]--;
          newCounts[`${reactionType}Total`]--;
          newCounts.total--;
          setUserReacted(false);
          setUserReactionType(null);
          localStorage.removeItem(`reaction_${recipeId}`);
        } else if (action === "update") {
          newCounts[userReactionType]--;
          newCounts[`${userReactionType}Total`]--;
          newCounts[reactionType]++;
          newCounts[`${reactionType}Total`]++;
          setUserReactionType(reactionType);
          localStorage.setItem(`reaction_${recipeId}`, reactionType);
        }

        setCounts(newCounts);
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
        <div className="flex flex-col justify-center items-center">
          <ThumbsUp
            onMouseEnter={() => setHovered("thumbsUp")}
            onMouseLeave={() => setHovered(null)}
          />
          <span>{counts.thumbsUpTotal}</span>
        </div>
        {hovered === "thumbsUp" && (
          <span className="tooltip">{counts.thumbsUpTotal}</span>
        )}
      </div>

      <div
        className={`relative cursor-pointer ${
          userReacted && userReactionType === "heart" ? "active" : ""
        }`}
        onClick={() => postReaction("heart")}
      >
        <div className="flex flex-col justify-center items-center">
          <Heart
            onMouseEnter={() => setHovered("heart")}
            onMouseLeave={() => setHovered(null)}
          />
          <span>{counts.heartTotal}</span>
        </div>
        {hovered === "heart" && (
          <span className="tooltip">{counts.heartTotal}</span>
        )}
      </div>
      
      <div
        className={`relative cursor-pointer ${
          userReacted && userReactionType === "laugh" ? "active" : ""
        }`}
        onClick={() => postReaction("laugh")}
      >
        <div className="flex flex-col justify-center items-center">
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
        <div className="flex flex-col justify-center items-center">
          <Angry
            onMouseEnter={() => setHovered("angry")}
            onMouseLeave={() => setHovered(null)}
          />
          <span>{counts.angryTotal}</span>
        </div>
        {hovered === "angry" && (
          <span className="tooltip">{counts.angryTotal}</span>
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
