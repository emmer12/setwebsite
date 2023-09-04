"use client";
import { AttachmentIcon, Close, Loading, SendIcon } from "@/components/icons";
import React, { useState } from "react";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";
import classnames from "classnames";

import {
  MessageBox,
  ChatItem,
  ChatList,
  Input,
  Navbar,
  Button,
  MessageList,
} from "react-chat-elements";
// RCE CSS
import "react-chat-elements/dist/main.css";
import { createMsg, getChats } from "@/lib/api/message.api";
import { IConversation, IMessage, IUser } from "@/types";
import { useSession } from "next-auth/react";

const anim = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const ChatPage = () => {
  const inputRef: any = React.createRef();
  const messageListReferance = React.createRef();
  const [inputValue, setValue] = useState<string>("");
  const { data, error, isLoading, mutate } = useSWR("/api/chats", getChats);
  const { data: session } = useSession();
  const [activeChat, setActiveChat] = useState<IConversation | undefined>(
    undefined
  );
  const [attachment, setAttachment] = useState<any>(null);

  const handleDownload = (fileUrl: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.target = "_blank";

    console.log(fileUrl, "here we come");

    if (!fileUrl.startsWith("http")) return;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    setAttachment(file);
  };

  const submitMessage = async () => {
    if (inputRef.current.value.length < 1) return;
    const data: any = {
      receiverId: activeChat?.Receiver.id,
      conversationId: activeChat?.id,
      text: inputRef.current.value,
    };

    let formData = new FormData();

    for (var key in data) {
      formData.append(key, data[key]);
    }

    if (attachment) {
      formData.append("attachment", attachment);
      data.fileName = attachment.name;
    }

    pushMessage(data);
    setTimeout(() => {
      scrollToBottom();
    }, 500);
    inputRef.current.value = "";
    setAttachment(null);
    await createMsg(formData);
    mutate();
  };

  const scrollToBottom = () => {
    const chatContainer: any = document.getElementById("chats_messages");
    chatContainer.scrollTop = chatContainer.scrollHeight;
  };

  const pushMessage = (data: any) => {
    setActiveChat((prev: any) => {
      return {
        ...prev,
        messages: [
          ...prev?.messages,
          {
            text: data.text as string,
            userId: session?.user.id as string,
            fileUrl: attachment ? attachment.name : "",
            conversationId: data.conversationId,
          },
        ],
      };
    });
  };

  const onDownload = (url: any, event: any) => {
    console.log(event);

    handleDownload(url, "filename");

    // download process
    // console.log("download process...");

    // msg.data.status.download = true;
    // msg.data.status.click = true;

    // console.log("download success!");
  };

  const chatUser = (conversation: IConversation): IUser => {
    const user: IUser =
      conversation.senderId == session?.user.id
        ? conversation.Receiver
        : conversation.User;
    return user;
  };

  const chats = data
    ? data?.map((conversation: IConversation) => {
        return {
          id: conversation.id,
          avatar:
            chatUser(conversation).image ||
            "https://avatars.githubusercontent.com/u/80540635?v=4",
          alt: conversation.name,
          title: chatUser(conversation).name,
          subtitle:
            conversation.messages.length > 0
              ? conversation.messages[conversation.messages.length - 1].text
              : `Start a conversation with ${chatUser(conversation).name}`,
          date: conversation.createdAt,
          unread: 0,
          className: conversation.id == activeChat?.id ? "active-chat" : "",
        };
      })
    : [];

  return (
    <div className="chat__container">
      {isLoading ? (
        <div className="flex w-full justify-center">
          <Loading />
        </div>
      ) : (
        <>
          <div className={classnames("chats", { close: !!activeChat })}>
            {data?.length ? (
              <ChatList
                className="chat-list"
                dataSource={chats}
                onClick={(chat: any) => {
                  const conversation = data.find(
                    (data: IConversation) => data.id == chat.id
                  );
                  setTimeout(() => {
                    scrollToBottom();
                  }, 500);
                  if (inputRef.current) {
                    inputRef.current.value = "";
                  }
                  setActiveChat(conversation);
                }}
              />
            ) : (
              <div>You have no conversation</div>
            )}
          </div>
          <div className={classnames("chats_messages", { open: !!activeChat })}>
            <div>
              {activeChat && (
                <Navbar
                  left={
                    <div className="flex justify-between">
                      <span>{chatUser(activeChat).name}</span>
                    </div>
                  }
                  right={
                    <span
                      className="hide-desk"
                      onClick={() => setActiveChat(undefined)}
                    >
                      Back to Chat
                    </span>
                  }
                />
              )}
            </div>
            <div className="body" id="chats_messages">
              {activeChat ? (
                activeChat.messages.map((message: IMessage, i) => (
                  <motion.div
                    variants={anim}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    key={i}
                  >
                    <MessageBox
                      position={
                        message.userId == session?.user.id ? "right" : "left"
                      }
                      className={
                        message.userId == session?.user.id
                          ? "border-v"
                          : "border-u"
                      }
                      type={message.fileUrl ? "file" : "text"}
                      title={
                        message.userId == session?.user.id
                          ? "You"
                          : message.receiver.id == session?.user.id
                          ? message.sender.name
                          : message.receiver.name
                      }
                      text={message.text}
                      onDownload={(event: any) =>
                        onDownload(message.fileUrl, event)
                      }
                      data={{
                        uri:
                          message.fileUrl ||
                          "https://www.sample-videos.com/pdf/Sample-pdf-5mb.pdf",
                        status: {
                          click: false,
                          loading: 0,
                        },
                      }}
                    />
                  </motion.div>
                ))
              ) : (
                <div className="p-4">No Active Chat</div>
              )}
            </div>

            {activeChat && (
              <div className="foot">
                {attachment && (
                  <div className="p-3 bg-[#f9f9f9] inline-block rounded-[5px] relative w-[200px]">
                    {attachment.name}
                    <div
                      className="cursor-pointer absolute top-2 right-2"
                      onClick={() => setAttachment(null)}
                    >
                      <Close />
                    </div>
                  </div>
                )}
                <Input
                  referance={inputRef}
                  placeholder="Type here..."
                  multiline={true}
                  value={inputValue}
                  // onChange={(e: any) => setValue(e.target.value)}
                  rightButtons={
                    <div className="flex">
                      <button
                        onClick={submitMessage}
                        className="cursor-pointer px-2 "
                      >
                        <SendIcon />
                      </button>
                    </div>
                  }
                  leftButtons={
                    <div className="flex cursor-pointer px-2">
                      <input
                        type="file"
                        className="hidden"
                        id="attachment"
                        name="attachment"
                        onChange={handleChange}
                      />
                      <label htmlFor="attachment" className="cursor-pointer">
                        <AttachmentIcon />
                      </label>
                    </div>
                  }
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ChatPage;
