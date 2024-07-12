import { useCallback, useEffect, useState } from "react";
import {
  createComment,
  getCommentCountForPin,
  getCommentsPerPinqoutes,
} from "@/services/comment.services";
import { CreateComment, GetCommentsData } from "@/types/comment.types";
import socketService from "@/services/socket.services";

export const useCommentPinqoutes = (userId: string | null, pinId: string) => {
  const [commentCount, setcommentCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [successful, setSuccessful] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      const fetchCommentData = async () => {
        try {
          setLoading(true);
          const count = await getCommentCountForPin(pinId);
          setcommentCount(count);
        } catch (error) {
          console.error("Error fetching like data:", error);
          setError("Error fetching like data");
        } finally {
          setLoading(false);
        }
      };

      fetchCommentData();
    }
    socketService.connect();
    socketService.on("comment", (data) => {
      if (data.pinId === pinId) {
        setcommentCount((prevCount) =>
          prevCount !== null ? prevCount + 1 : 1
        );
        getCommentsPerPinqoutes(pinId);
      }
    });

    return () => {
      socketService.off("comment");
      socketService.disconnect();
    };
  }, [userId, pinId]);

  const handleCommentPin = async (formValue: CreateComment) => {
    const { comment } = formValue;

    const createComments: CreateComment = {
      comment,
    };

    if (!userId) {
      setError("User is not logged in");
      return;
    }
    try {
      setLoading(true);
      setSuccessful(false);
      await createComment(userId, pinId, createComments);
      console.log("Comment added successfully");
      socketService.emit("comment", { userId, pinId });
    } catch (error) {
      console.error("Error saving comment:", error);
      setError("Error saving comment");
    } finally {
      setLoading(false);
      setSuccessful(true);
    }
  };

  return {
    handleCommentPin,
    successful,
    loading,
    error,
    commentCount,
  };
};

export const useGetAllCommentsPerPinqoutes = () => {
  const [getAllComments, setGetAllComments] = useState<GetCommentsData[]>([]);

  const fetchAllCommentsPerPinqoutes = useCallback(async (pinId: string) => {
    try {
      const comments = await getCommentsPerPinqoutes(pinId);
      setGetAllComments(comments);
      console.log("Pins fetched successfully");
    } catch (error) {
      console.error("Error fetching pins:", error);
    }
  }, []);

  return {
    getAllComments,
    fetchAllCommentsPerPinqoutes,
  };
};
