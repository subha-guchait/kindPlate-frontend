"use client";

import {
  FaRegPaperPlane,
  FaRegHeart,
  FaHeart,
  FaRegBookmark,
  FaBookmark,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaCopy,
  FaCheck,
} from "react-icons/fa";
import { X } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CircleEllipsis, Trash2 } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";
import { useLike, useClaimPost, useDeletePost } from "@/hooks/usePostAction";

export const PostCard = ({ post, onDelete }) => {
  const { liked, likeCount, loading, handleLikeToggle } = useLike(post);
  const { claiming, handleClaim, isClaimed } = useClaimPost(post);

  const [bookmarked, setBookmarked] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [copied, setCopied] = useState(false);

  const { authUser } = useAuthContext();

  const [previewImg, setPreviewImg] = useState(null);
  // 🔹 Close modal on Esc key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setPreviewImg(null);
      }
    };

    if (previewImg) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => window.removeEventListener("keydown", handleEsc);
  }, [previewImg]);

  const handleDeleteSuccess = () => {
    if (onDelete) onDelete(post._id);
  };

  const { deleting, handleDelete } = useDeletePost(
    post._id,
    handleDeleteSuccess
  );

  const handleBookmark = () => {
    setBookmarked((prev) => !prev);
  };

  const handleContactClick = () => {
    setShowContact(true);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(post.postedBy.phone || "Not Available");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const getUserAvatar = (post) =>
    post.postedBy.imgUrl ||
    `https://placehold.co/35x35?text=${post.postedBy.firstName[0]}${post.postedBy.lastName[0]}`;

  const toISTTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
    });
  };

  const expiryDate = new Date(post.expiryTime).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });

  const isExpired = new Date(post.expiryTime) < new Date();

  const getStatusBadge = () => {
    const now = new Date();
    const expiry = new Date(post.expiryTime);
    const timeLeftInHours = (expiry - now) / (1000 * 60 * 60); // milliseconds to hours

    if (isExpired && !isClaimed)
      return { text: "Expired", color: "badge-error" };
    if (isClaimed) return { text: "Claimed", color: "badge-success" };
    if (timeLeftInHours <= 3)
      return { text: "Expiring Soon", color: "badge-accent" };
    return { text: "Available", color: "badge-warning" };
  };

  const { text, color } = getStatusBadge();

  return (
    <div className="relative">
      {/* Spinner Overlay */}
      {deleting ||
        (claiming && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 rounded-4xl">
            <span className="loading loading-spinner text-primary scale-150"></span>
          </div>
        ))}

      {/* Image Preview Modal */}
      {previewImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <button
            onClick={() => setPreviewImg(null)}
            className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 cursor-pointer tooltip tooltip-left"
            data-tip="Press Esc to close"
          >
            <X className="h-6 w-6 " />
          </button>
          <img
            src={previewImg}
            alt="Preview"
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
          />
        </div>
      )}

      {/*Post Card content*/}
      <div className="m-4 w-full min-w-[18rem] max-w-[18rem] sm:min-w-[22rem] sm:max-w-[22rem] md:min-w-[28rem] md:max-w-[28rem] rounded-4xl bg-background border border-primary/10 shadow-lg p-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 card-header">
          <div className="flex items-center gap-4">
            <img
              src={getUserAvatar(post)}
              alt={post.postedBy.firstName}
              width={35}
              height={35}
              className="rounded-full cursor-pointer"
              onClick={() => setPreviewImg(getUserAvatar(post))}
            />
            <div>
              <h3 className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Link
                    to={`/users/${post.postedBy._id}`}
                    className=" hover:underline"
                  >
                    <p className="text-lg font-semibold">
                      {post.postedBy.firstName} {post.postedBy.lastName}
                    </p>
                  </Link>
                  <div className={`badge ${color} text-xs`}>{text}</div>
                </div>
                <span className="opacity-70 text-sm">
                  {toISTTime(post.createdAt)}
                </span>
              </h3>
            </div>
          </div>
          {authUser?.id === post.postedBy._id && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="p-2 hover:bg-secondary rounded-full cursor-pointer">
                  <CircleEllipsis className="h-5 w-5" />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Content
                className="z-50 bg-white shadow-md rounded-md px-2 py-1 text-sm"
                sideOffset={8}
              >
                {!isClaimed && !isExpired && (
                  <DropdownMenu.Item
                    className="hover:bg-gray-100 px-2 py-1 rounded-md cursor-pointer"
                    onClick={handleClaim}
                  >
                    ✅ Mark as Claimed
                  </DropdownMenu.Item>
                )}

                <DropdownMenu.Item
                  className="flex items-center gap-2 text-red-600 hover:bg-red-100 px-2 py-1 rounded-md cursor-pointer"
                  onClick={handleDelete}
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete Post</span>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
        </div>

        {/* Content */}
        <div className=" mt-4 flex flex-col gap-4">
          <p className="whitespace-pre-wrap">
            <strong>{post.title} </strong>
            <br />
            <br />
            {post.description}
          </p>
          <div>🕒 {expiryDate}</div>
          <div>🍽️ {post.servings}</div>
          <div>
            📍 {post.location?.street}, {post.location?.city},{" "}
            {post.location?.state}
          </div>

          {post.mediaUrl && (
            <img
              src={post.mediaUrl}
              alt={post.title}
              className="w-full max-w-[18rem] sm:max-w-[22rem] md:max-w-[28rem] aspect-[4/3] h-48 sm:h-60 md:h-72 object-cover rounded-lg"
              onClick={() => setPreviewImg(post.mediaUrl)}
            />
          )}

          <div className="text-sm text-gray-600 space-y-1"></div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex justify-evenly gap-2">
          <button
            onClick={handleLikeToggle}
            disabled={loading}
            title="like"
            className="flex grow items-center justify-center gap-2 rounded-xl px-4 py-2 transition hover:bg-secondary cursor-pointer"
          >
            {liked ? <FaHeart color="red" /> : <FaRegHeart />}

            <span className="text-sm text-gray-500">{likeCount}</span>
          </button>

          <button
            onClick={handleBookmark}
            className="flex grow items-center justify-center gap-3 rounded-xl px-4 py-2 transition hover:bg-secondary"
          >
            {bookmarked ? <FaBookmark color="#00bfff" /> : <FaRegBookmark />}
          </button>
          {showContact ? (
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm text-primary font-medium ">
                📞 {post.postedBy.phone || "Not Available"}
              </span>
              <button
                onClick={handleCopy}
                className="text-xs text-white bg-primary px-3 py-1 rounded-full flex items-center gap-2 cursor-pointer"
              >
                {copied ? <FaCheck /> : <FaCopy />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          ) : (
            <button
              onClick={handleContactClick}
              className="flex grow items-center justify-center gap-3 rounded-xl px-4 py-2 transition hover:bg-white/5"
            >
              <FaPhoneAlt />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
