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
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
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

      {/*Post Card content*/}
      <div className="m-4 w-full max-w-[28rem] rounded-4xl bg-background border border-primary/10 shadow-lg p-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 card-header">
          <div className="flex items-center gap-4">
            <img
              src={getUserAvatar(post)}
              alt="User"
              width={35}
              height={35}
              className="rounded-full"
            />
            <div>
              <h3 className="flex flex-col">
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold">
                    {post.postedBy.firstName} {post.postedBy.lastName}
                  </p>
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
        <div className="mt-4 flex flex-col gap-4">
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
              className="w-full h-64 sm:h-72 md:h-80 object-cover rounded-lg"
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
            className="flex grow items-center justify-center gap-2 rounded-xl px-4 py-2 transition hover:bg-secondary"
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
              <span className="text-sm text-primary font-medium">
                📞 {post.postedBy.phone || "Not Available"}
              </span>
              <button
                onClick={handleCopy}
                className="text-xs text-white bg-primary px-3 py-1 rounded-full flex items-center gap-2"
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
