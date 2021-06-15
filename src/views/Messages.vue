<template>
  <article class="tw-bg-gray-50 tw-py-4 tw-flex tw-flex-wrap">
    <section class="tw-w-full md:tw-w-2/5 tw-p-3">
      <h3 class="tw-text-lg tw-text-center tw-bg-blue-100 tw-p-2">Messages</h3>
      <div>
        <div
          v-for="msg of adChats"
          :key="msg"
          class="tw-p-2 tw-bg-gray-200 tw-mb-2 tw-rounded-3xl tw-flex tw-cursor-pointer hover:tw-bg-blue-500"
          @click="getChats(msg.ad_id, msg.ad.title, msg.chatter, msg.ad_image)"
        >
          <img
            :src="msg.ad_image"
            class="tw-bg-gray-100 tw-h-16 tw-w-16 tw-rounded-full"
          />
          <div
            class="tw-p-4 tw-bg-white tw-flex-grow tw-rounded-xl"
            style="min-height:4rem"
          >
            {{ msg.ad.title }}
          </div>
        </div>
      </div>
    </section>
    <section class="tw-p-2 tw-w-full md:tw-w-3/5" v-if="currentChat">
      <div class="tw-bg-blue-500 tw-text-white tw-text-center tw-p-2">
        <p>{{ chatter.first_name + " " + chatter.last_name }}</p>
      </div>
      <div class="tw-bg-blue-200 tw-flex tw-flex-grow tw-p-1">
        <img
          :src="adImage"
          alt=""
          class="tw-h-16 tw-w-16 tw-rounded-md tw-bg-pink-600"
        />
        <p class="tw-p-2">
          {{ adTitle }}
        </p>
      </div>
      <div
        class="tw-overflow-x-auto tw-p-3"
        style="min-height: 40vh; max-height:40vh"
        id="chatContainer"
      >
        <div
          :class="getChatStyle(chat)"
          v-for="(chat, index) of currentChat"
          :key="chat.id"
        >
          <p
            class="tw-bg-purple-50 tw-rounded-lg tw-border tw-mt-2 tw-p-2 tw-border-blue-200"
          >
            {{ chat.message }}
          </p>
          <div
            class="tw-w-full tw-h-2 tw-mt-2 tw-bg-blue-200"
            v-if="currentChat.length - 1 == index"
          >
            {{ updateScroll() }}
          </div>
        </div>
      </div>
      <div class="tw-flex tw-bg-blue-200 tw-py-2">
        <div class="tw-flex-grow tw-bg-blue-50">
          <textarea
            name="message"
            id=""
            cols="4"
            rows="14"
            class="tw-rounded-md"
            v-model="chatMessage"
          ></textarea>
        </div>
        <div
          class="tw-bg-blue-600 tw-px-4 tw-py-2 tw-text-white tw-flex tw-items-center tw-justify-items-center tw-rounded-2xl tw--ml-4 hover:tw-bg-blue-800 tw-cursor-pointer"
          @click="sendMessage()"
        >
          Send
        </div>
      </div>
    </section>
    <section
      v-else
      class="tw-w-full md:tw-w-3/5 tw-p-3 tw-flex tw-justify-center tw-items-center tw-bg-indigo-300 tw-h-24"
    >
      <p>Select an Ad to continue chatting</p>
    </section>
  </article>
</template>
<script>
import { mapState } from "vuex";
import store from "../store";
export default {
  data() {
    return {
      messages: null,
      adChats: null,
      currentChat: null,
      chatter: null,
      chatTitle: null,
      adImage: null,
      chatMessage: "",
      showSuccessInfo: false,
      receiverStyle: {
        "tw-mt-2 tw-flex tw-flex-wrap": true,
      },
      senderStyle: {
        "tw-mt-2 tw-flex tw-justify-end tw-flex-wrap": true,
      },
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    getChatStyle(chat) {
      /*  alert(
        "chat receiver id " +
          chat.receiver_id +
          " : chat sender id" +
          chat.sender_id +
          " : current user " +
          this.user.id +
          "chatter id: " +
          this.chatter.id
      ); */
      chat;
      if (this.chatter.id != chat.sender_id) return this.senderStyle;
      return this.receiverStyle;
    },
    getChats(adID, adTitle = "", chatter = {}, adImage = null) {
      if (adImage) {
        //if this paramenters are set, it means it is the first time but if not, it is an update
        console.log(adID);
        this.adTitle = adTitle;
        this.chatter = chatter;
        this.adImage = adImage;
      }
      this.currentChat = this.messages.filter((item) => {
        return item.ad_id == adID;
      });
      //this.axios.get()
    },
    sendMessage() {
      let adID = this.currentChat[0].ad_id;
      //alert(adID);
      if (this.chatMessage.trim() != "") {
        //alert("About to send message");
        this.axios
          .post(process.env.VUE_APP_APIURL + "/messages", {
            message: this.chatMessage,
            ad_id: adID,
            receiver_id: this.chatter.id,
          })
          .then((response) => {
            let data = response.data;
            console.log(data.ad_chats);
            console.log(data.messages);
            this.messages = data.messages;
            this.adChats = data.ad_chats;
            this.chatMessage = "";
            this.showSuccessInfo = true;
            this.getChats(adID);
            store.dispatch("setProps", {
              name: "messages",
              value: data.messages,
              type: "user",
            });
            setTimeout(() => {
              this.showSuccessInfo = false;
            }, 3500);
            //alert("Message successfully sent to seller");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("Can't send empty message");
        this.chatMessage = "";
      }
    },
    updateScroll() {
      setTimeout(() => {
        //delay the selecting of the element for it to be availabe when read
        var element = document.getElementById("chatContainer");
        element.scrollTop = element.scrollHeight - element.clientHeight;
      }, 500);
      //alert(element.scrollHeight + " : " + element.clientHeight);
    },
  },
  mounted() {
    if (this.user.messages) {
      this.messages = this.user.messages;
      this.adChats = this.user.ad_chats;
      console.log(this.adChats);
    }
    console.log(this.user);
  },
};
</script>
