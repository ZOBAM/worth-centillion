import Pagination from "@/components/Pagination.vue";

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      startIndex: 0,
      endIndex: 5,
      perPage: 5,
      currentPage: 1,
    };
  },
  computed: {
    numOfPages() {
      return Math.ceil(this.items.length / this.perPage);
    },
  },
  methods: {
    paginate(page) {
      if (page == 0 || page > this.numOfPages) {
        return;
      }
      this.startIndex = (page - 1) * this.perPage;
      this.endIndex = (page - 1) * this.perPage + this.perPage;
      this.currentPage = page;
      //let i = 5;
    },
  },
  created() {},
};
