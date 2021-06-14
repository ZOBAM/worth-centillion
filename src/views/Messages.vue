<template>
  <article class="tw-bg-gray-50 tw-py-4 tw-flex tw-flex-wrap ">
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
      <div class="tw-h-2/4 tw-overflow-x-auto tw-p-3">
        <div
          :class="getChatStyle(chat)"
          v-for="chat of currentChat"
          :key="chat.id"
        >
          <p
            class="tw-bg-purple-50 tw-rounded-lg tw-border tw-mt-2 tw-p-2 tw-border-blue-200"
          >
            {{ chat.message }}
          </p>
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
          class="tw-bg-blue-600 tw-px-4 tw-py-2 tw-text-white tw-flex tw-items-center tw-justify-items-center tw-z-10 tw-rounded-2xl tw--ml-4"
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
        "tw-mt-2 tw-flex": true,
      },
      senderStyle: {
        "tw-mt-2 tw-flex tw-justify-end": true,
      },
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    getChatStyle(chat) {
      alert(
        "chat receiver id " +
          chat.receiver_id +
          " : chat sender id" +
          chat.sender_id +
          " : current user " +
          this.user.id +
          "chatter id: " +
          this.chatter.id
      );
      if (this.chatter.id != this.user.id) return this.senderStyle;
      return this.receiverStyle;
    },
    getChats(adID, adTitle, chatter, adImage) {
      console.log(adID);
      this.adTitle = adTitle;
      this.chatter = chatter;
      this.adImage = adImage;
      this.currentChat = this.messages.filter((item) => {
        return (item.ad_id = adID);
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
          })
          .then((response) => {
            console.log(response.data.ad_chats);
            this.messages = response.data.messages;
            this.adChats = response.data.ad_chats;
            this.chatMessage = "";
            this.showSuccessInfo = true;
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
