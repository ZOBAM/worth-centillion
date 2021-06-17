<template>
  <article class="tw-bg-gray-50 tw-py-4 tw-flex tw-flex-wrap">
    <section class="tw-w-full md:tw-w-2/5 tw-p-3">
      <h3 class="tw-text-lg tw-text-center tw-bg-blue-100 tw-p-2">Messages</h3>
      <div>
        <div
          v-for="msg of user.ad_chats"
          :key="msg"
          :class="{
            'tw-p-2 tw-bg-gray-200 tw-mb-2 tw-rounded-3xl tw-flex tw-cursor-pointer hover:tw-bg-blue-500': true,
            'tw-bg-blue-500': msg.ad_id == currentAdID,
          }"
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
    <section class="tw-p-2 tw-w-full md:tw-w-3/5" v-if="currentChat && chatter">
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
        <template v-for="(chat, index) of currentChat" :key="chat.id">
          <div
            :class="{
              'tw-mt-2 tw-flex tw-justify-end tw-flex-wrap':
                chatter.id != chat.sender_id,
              'tw-mt-2 tw-flex tw-flex-wrap': chatter.id == chat.sender_id,
            }"
          >
            <p
              :class="{
                'shadow-lg tw-bg-purple-50 tw-rounded-lg tw-border tw-mt-2 tw-p-2 tw-border-blue-200 shadow-gray':
                  chatter.id != chat.sender_id,
                'tw-shadow-lg tw-bg-purple-50 tw-rounded-lg tw-border tw-mt-2 tw-p-2 tw-border-blue-200 shadow-blue':
                  chatter.id == chat.sender_id,
              }"
            >
              {{ chat.message }}
            </p>
          </div>
          <!-- <div v-if="chatter.id != chat.sender_id" :class="receiverStyle">
            <p
              class="shadow-lg tw-bg-purple-50 tw-rounded-lg tw-border tw-mt-2 tw-p-2 tw-border-blue-200 shadow-gray"
            >
              {{ chat.message }}
            </p>
          </div>
          <div v-if="chatter.id != chat.sender_id" :class="senderStyle">
            <p
              class="tw-shadow-lg tw-bg-purple-50 tw-rounded-lg tw-border tw-mt-2 tw-p-2 tw-border-blue-200 shadow-blue"
            >
              {{ chat.message }}
            </p>
          </div> -->
          <div
            class="tw-w-full tw-h-2 tw-mt-2 tw-bg-blue-200"
            v-if="currentChat.length - 1 == index && messageSuccess"
          >
            {{ updateScroll() }}
          </div>
        </template>
      </div>
      <div class="tw-flex tw-bg-gray-50 tw-py-2">
        <div class="tw-flex-grow tw-bg-gray-50 tw-px-2">
          <textarea
            name="message"
            id=""
            cols="4"
            rows="14"
            class="tw-rounded-md tw-bg-white tw-h-16"
            v-model="chatMessage"
          ></textarea>
        </div>
        <div
          class="tw-bg-blue-50 tw-p-2 tw-text-white tw-flex tw-z-10 tw-items-center tw-justify-items-center tw-rounded-xl tw--ml-1 hover:tw-bg-blue-800 tw-cursor-pointe"
          @click="sendMessage()"
        >
          <button class="tw-bg-white tw-text-black tw-px-3 tw-py-2">
            Send <span class="mdi mdi-send"></span>
          </button>
        </div>
      </div>
      <aside
        class="tw-bg-red-600 tw-text-white tw-font-bold"
        v-if="messageSuccess"
      >
        Message succefully sent.
      </aside>
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
      //messages: null,
      //adChats: null,
      //currentChat: null,
      chatter: null,
      chatTitle: null,
      adImage: null,
      chatMessage: "",
      showSuccessInfo: false,
      currentAdID: null,
      listChatStyle: null,
      receiverStyle: {
        "tw-mt-2 tw-flex tw-flex-wrap": true,
      },
      senderStyle: {
        "tw-mt-2 tw-flex tw-justify-end tw-flex-wrap": true,
      },
    };
  },
  computed: {
    ...mapState(["user", "messageSuccess"]),
    currentChat() {
      return this.user.messages.filter((item) => {
        return item.ad_id == this.currentAdID;
      });
    },
  },
  methods: {
    getChatStyle(chat) {
      if (this.chatter.id != chat.sender_id) {
        this.listChatStyle = {
          "shadow-lg tw-bg-purple-50 tw-rounded-lg tw-border tw-mt-2 tw-p-2 tw-border-blue-200 shadow-gray": true,
        };
        return this.senderStyle;
      } else {
        this.listChatStyle = {
          "tw-shadow-lg tw-bg-purple-50 tw-rounded-lg tw-border tw-mt-2 tw-p-2 tw-border-blue-200 shadow-blue": true,
        };
        return this.receiverStyle;
      }
    },
    getChats(adID, adTitle = "", chatter = {}, adImage = null) {
      console.log("Heap from getChat function");
      this.currentAdID = adID;
      if (adImage) {
        //if this paramenters are set, it means it is the first time but if not, it is an update
        console.log(adID);
        this.adTitle = adTitle;
        this.chatter = chatter;
        this.adImage = adImage;
      }
      /* this.currentChat = this.user.messages.filter((item) => {
        return item.ad_id == adID;
      }); */
    },
    sendMessage() {
      let adID = this.currentChat[0].ad_id;
      //alert(adID);
      if (this.chatMessage.trim() != "") {
        let data = {
          message: this.chatMessage,
          ad_id: adID,
          receiver_id: this.chatter.id,
        };
        store.dispatch("messages", data);
      } else {
        alert("Can't send empty message");
        this.chatMessage = "";
      }
    },
    updateScroll() {
      this.chatMessage = "";
      setTimeout(() => {
        //delay the selecting of the element for it to be availabe when read
        var element = document.getElementById("chatContainer");
        element.scrollTop = element.scrollHeight - element.clientHeight;
      }, 500);
      //alert(element.scrollHeight + " : " + element.clientHeight);
    },
  },
};
</script>
<style lang="scss" scoped>
.shadow-gray {
  box-shadow: 2px 2px gray;
}
.shadow-blue {
  box-shadow: -2px 2px rgb(110, 165, 108);
}
</style>
