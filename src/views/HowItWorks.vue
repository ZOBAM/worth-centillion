<template>
  <main class="tw-bg-white tw-p-5 tw-font-noto tw-text-lg">
    <h1 class="tw-bg-gray-100 tw-text-center tw-text-3xl tw-font-semibold tw-font-roboto">
      How It <span class="tw-text-blue-700">W</span>orks
    </h1>
    <section>
      <div>
        <h3 class="tw-bg-gray-200 tw-p-2 tw-font-bold tw-mt-10">
          Place New Add
        </h3>
        <p>
          We know that sometime, all you need is just to say that you have
          something for sale. Therefore, we have simplified the process of
          posting new ads.
        </p>
        <p>
          The process is in two stages:
        </p>
        <ol class="tw-list-decimal tw-ml-5">
          <li>
            Categorize your ad by choosing the category and subcategory, give it
            a meaningful and relevant title so that potential customers can
            relate to your ad by just reading the title, state the price, set
            the location and proceed.
          </li>
          <li>
            Here is an optional step made with the intention of proving more
            specific details concerning your ad. This is not compulsory which
            means that you can skip this step (by clicking “skip & Create Ad”
            button) and submit your ad but it is always recommended that you
            provide as much information as possible so that viewers can know
            enough to make purchasing decision without going through the extra
            hassle of trying to reach you.
          </li>
        </ol>
        <p>
          In fact, there is no restriction the moment you have an item you
          really want to sale or service you want to get its message out.
        </p>
      </div>
      <div>
        <h3 class="tw-bg-gray-200 tw-p-2 tw-font-bold tw-mt-10">Promoted Ads</h3>
        <p>
          There are three categories of ads. The sure thing is that you will
          find a category that fits you/your pocket:
        </p>
        <ol class="tw-list-decimal tw-ml-5">
          <li>
            <span class="tw-text-blue-800 tw-text-lg">Bronze</span>: This is the entry level and the first tier of ads. It’s
            free.
          </li>
          <li>
            <span class="tw-text-blue-800 tw-text-lg">Silver</span>: This is the second class of ads. It gives your ad more reach
            and a unique place on the homepage for 7days. The price can be seen
            at the point of ad creation.
          </li>
          <li>
            <span class="tw-text-blue-800 tw-text-lg">Gold</span>: This is the third and the highest tier of ads. If you need the
            greatest reach and visibility for your ad, this will be your best
            option. Ads on this category will appear everywhere that matters on
            the site.
          </li>
        </ol>
        <p>
          Promoted ads will display their remaining days before promotion expiry
          in the User Ads section.
        </p>
      </div>
      <div>
        <h3 class="tw-bg-gray-200 tw-p-2 tw-font-bold tw-mt-10">
          Referral Points
        </h3>
        <p>
          When you trust Hamsuper to be the platform for spreading the word
          about your products and services, you reap many benefits. You won’t
          just get the words out there but you will earn points that can be
          converted to free mobile data for surfing the web!
        </p>
        <p>
          There are three ways you can invite others to register and earn reward
          points when they do:
        </p>
        <ol class="tw-list-decimal tw-ml-5">
          <li>
            Text/SMS message invitation You can send free SMS from our site to
            your friends asking them to register on Hamsuper. You can only
            invite each phone number once and a maximum of 3 SMS per day.
          </li>
          <li>
            Email invitation You can invite friends by email. Each email
            address can receive a maximum of two invitations from you and you
            can send a maximum of 10 invitations per day.
          </li>
          <li>
            Sharing invitation link
          </li>
        </ol>
        <p>
          <span class="notice">Please Note:</span> For text and email invitation, we recommend you send it
          to those you know and keep in mind that your name and sending contact
          will be part of the message body. A preview of the sent message can be
          seen at the bottom of the invite page.
        </p>
      </div>
      <div>
        <h3 class="tw-bg-gray-200 tw-p-2 tw-font-bold tw-mt-10">
          Cheap Data & Airtime
        </h3>
        <p>
          You can and it is recommended that you buy mobile data plans from our VTU section because we offer one the cheapest prices for data across all the major networks in Nigeria. You can also purchase airtime from the networks listed below.
        </p>
        <p>
          If you are using any or a combination of the following networks, relax, we got you covered:
        </p>
        <ul class="collection tw-ml-5">
          <li class="collection-item">
            MTN
          </li>
          <li class="collection-item">
            Glo
          </li>
          <li class="collection-item">
            Airtel
          </li>
          <li class="collection-item">
            9mobile
          </li>
        </ul>
        <p>
          <span class="notice">Follow this link:</span> <router-link to="/vtu" class="link">Hamsuper VTU</router-link>, fund your wallet and start enjoying unrivaled discounts on data purchases.
        </p>
      </div>
    </section>
  </main>
</template>
<script>
export default {
  name: "HowItWorks",
};
</script>
<style lang="scss" scoped>
p {
  margin-top: 0.8rem;
}
li{
  margin: 0.8rem 0rem;
}
</style>
