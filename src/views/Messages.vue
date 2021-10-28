<template>
  <article class="">
    <section
      class="bg-gray-50 py-4 flex flex-wrap"
      v-if="user.adChats.length > 0"
    >
      <section class="w-full md:w-2/5 p-3">
        <h3 class="text-lg text-center bg-blue-100 p-2">
          Messages
        </h3>
        <div>
          <div v-for="msg of user.adChats" :key="msg">
            <div
              :class="{
                'p-2 bg-gray-200 mb-2 rounded-3xl flex cursor-pointer hover:bg-blue-500': true,
                'bg-blue-500': msg.ad_id == currentAdID,
              }"
              @click="
                getChats(msg.ad_id, msg.ad.title, msg.chatter, msg.ad_image)
              "
              v-if="msg.ad"
            >
              <img
                :src="msg.ad_image"
                class="bg-gray-100 h-16 w-16 rounded-full"
              />
              <div
                class="p-4 bg-white flex-grow rounded-xl"
                style="min-height:4rem"
              >
                {{ msg.ad.title }}
              </div>
            </div>
            <div
              v-else
              class="mt-4"
              :class="{
                'p-2 bg-gray-200 mb-2 rounded-3xl flex cursor-pointer hover:bg-blue-500': true,
                'bg-blue-500': msg.ad_id == currentAdID,
              }"
            >
              This Ad was removed.
            </div>
          </div>
        </div>
      </section>
      <section class="p-2 w-full md:w-3/5" v-if="currentChat && chatter">
        <div class="bg-blue-500 text-white text-center p-2">
          <p>{{ chatter.first_name + " " + chatter.last_name }}</p>
        </div>
        <div class="bg-blue-200 flex flex-grow p-1">
          <img :src="adImage" alt="" class="h-16 w-16 rounded-md bg-pink-600" />
          <p class="p-2">
            {{ adTitle }}
          </p>
        </div>
        <div
          class="overflow-x-auto p-3"
          style="min-height: 40vh; max-height:40vh"
          id="chatContainer"
        >
          <template v-for="(chat, index) of currentChat" :key="chat.id">
            <div
              :class="{
                'justify-end': chatter.id != chat.sender_id,
                'mt-2 flex flex-wrap': true,
              }"
            >
              <p
                :class="{
                  'shadow-lg bg-purple-50 rounded-lg border mt-2 p-2 border-blue-200': true,
                  'shadow-gray': chatter.id != chat.sender_id,
                  'shadow-blue': chatter.id == chat.sender_id,
                }"
              >
                {{ chat.message }}
              </p>
            </div>
            <!-- <div v-if="chatter.id != chat.sender_id" :class="receiverStyle">
              <p
                class="shadow-lg bg-purple-50 rounded-lg border mt-2 p-2 border-blue-200 shadow-gray"
              >
                {{ chat.message }}
              </p>
            </div>
            <div v-if="chatter.id != chat.sender_id" :class="senderStyle">
              <p
                class="shadow-lg bg-purple-50 rounded-lg border mt-2 p-2 border-blue-200 shadow-blue"
              >
                {{ chat.message }}
              </p>
            </div> -->
            <div
              class="w-full h-2 mt-2 bg-blue-200"
              v-if="currentChat.length - 1 == index && messageSuccess"
            >
              {{ updateScroll() }}
            </div>
          </template>
        </div>
        <div class="flex bg-gray-50 py-2">
          <div class="flex-grow bg-gray-50 px-2">
            <textarea
              name="message"
              id=""
              rows="14"
              class="rounded-md bg-white h-16 w-full"
              v-model="chatMessage"
            ></textarea>
          </div>
          <div
            class="bg-blue-50 p-2 text-white flex z-10 items-center justify-items-center rounded-xl -ml-1 hover:bg-blue-800 cursor-pointe"
            @click="sendMessage()"
          >
            <button class="bg-white text-black px-3 py-2">
              Send <span class="mdi mdi-send"></span>
            </button>
          </div>
        </div>
        <aside class="bg-red-600 text-white font-bold" v-if="messageSuccess">
          Message succefully sent.
        </aside>
      </section>
      <section
        v-else
        class="w-full md:w-3/5 p-3 mt-6 flex justify-center items-center bg-indigo-300 h-24"
      >
        <p>Select an Ad to continue chatting</p>
      </section>
    </section>
    <section v-else class="flex justify-center items-center h-32 bg-white">
      <p class="p-2 bg-red-100">You currently do not have any message.</p>
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
        "mt-2 flex flex-wrap": true,
      },
      senderStyle: {
        "mt-2 flex justify-end flex-wrap": true,
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
          "shadow-lg bg-purple-50 rounded-lg border mt-2 p-2 border-blue-200 shadow-gray": true,
        };
        return this.senderStyle;
      } else {
        this.listChatStyle = {
          "shadow-lg bg-purple-50 rounded-lg border mt-2 p-2 border-blue-200 shadow-blue": true,
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
        //alert("Can't send empty message");
        this.$toast.add({
          severity: "error",
          summary: "Empty Chat!",
          detail: "Can't send empty message",
          life: 2500,
        });
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
