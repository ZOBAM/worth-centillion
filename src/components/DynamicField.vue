<template>
  <template v-if="field.length > 1">
    <label for="" class="block text-xs font-semibold px-1">{{
      index.split(":")[0]
    }}</label>
    <select
      :name="index.split(':')[1]"
      id=""
      class="w-4/5 md:w-2/3 outline-none border-0 border-b-2 border-gray-400 focus:outline-none focus:border-transparent rounded"
    >
      <option
        v-for="opt of field"
        :key="opt"
        :selected="fieldValue == opt"
        :value="opt"
        >{{ opt }}</option
      >
    </select>
  </template>
  <template v-else>
    <label for="" class="block text-xs font-semibold px-1">{{
      index.split(":")[0]
    }}</label>
    <input
      type="text"
      :name="index.split(':')[1]"
      id=""
      :value="fieldValue"
      @change="checkValue($event, field[0])"
      class="w-4/5 md:w-2/3 outline-none border-0 border-b-2 border-gray-400 focus:outline-none focus:border-transparent rounded"
    />
    <template v-if="valueChanged">
      <span class="block text-red-500 text-sm" v-if="errorMessage">{{
        errorMessage
      }}</span></template
    >
    <!-- <ErrorMessage :name="index.split(':')[1]" class="block text-red-500 text-sm" /> -->
  </template>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "DynamicField",
  props: ["field", "index", "adDetails", "fieldValue"],
  components: {},
  data() {
    return {
      errorMessage: "",
      validationRule: null,
      valueChanged: false,
    };
  },
  methods: {
    getValue(fieldName, option = null, setValue = false) {
      //there is a bug that makes this function to run each time form field is changed and makes it impossible to change the values because it reverses the changes by repopulating the field from the edited ad data. I'll have to call this function from the onChange function
      console.log("get dynamic value was called");
      if (this.adDetails) {
        if (option) {
          return this.adDetails[fieldName] == option ? true : false;
        } else {
          if (setValue)
            console.log("get dynamic value was called to set value");
          return setValue ? fieldName : this.adDetails[fieldName];
        }
      } else {
        return "";
      }
    },
    getMinMax(value) {
      if (this.validationRule.indexOf(value) != -1) {
        if (value == "min") {
          let matchResult = /min:([0-9]+)/.exec(this.validationRule);
          let minValue = matchResult[1] * 1;
          return minValue;
        } else {
          let matchResult = /max:([0-9]+)/.exec(this.validationRule);
          let maxValue = matchResult[1] * 1;
          return maxValue;
        }
      } else {
        return false;
      }
    },
    checkValue(e, validationRule) {
      this.validationRule = validationRule;
      this.valueChanged = true;
      let fieldName = e.target.name;
      let fieldValue = e.target.value;
      //prevent the input from reverting to former values
      if (this.editedAdID) {
        setTimeout(() => {
          e.target.value = fieldValue;
        }, 1);
      }
      this.errorMessage = false;
      //let ruleArray = this.validationRule.split("|");
      //console.log(ruleArray);
      if (fieldValue.trim() == "") {
        //check empty string
        this.errorMessage = "This field is required";
        alert("You cannot save empty value for: " + fieldName);
      } else {
        if (this.validationRule.indexOf("numeric") != -1) {
          if (isNaN(fieldValue)) {
            //validate numeric
            this.errorMessage = `${fieldName} must be a number`;
            //alert('this field must be of number type');
          } else {
            if (this.validationRule.indexOf("min")) {
              //check if passed min requirement
              let minValue = this.getMinMax("min");
              if (fieldValue < minValue) {
                this.errorMessage = `must not be less than ${minValue}`;
              }
            }
            if (this.validationRule.indexOf("max")) {
              //check if passed min requirement
              let maxValue = this.getMinMax("max");
              if (fieldValue > maxValue) {
                this.errorMessage = `must not be more than ${maxValue}`;
              }
            }
          }
        } else {
          //validate string
          if (this.validationRule.indexOf("min")) {
            //check if passed min requirement
            let minValue = this.getMinMax("min");
            if (fieldValue.length < minValue) {
              this.errorMessage = `must be at least ${minValue} characters`;
            }
            //console.log(minValue);
          }
          if (this.validationRule.indexOf("max")) {
            //check if passed min requirement
            let maxValue = this.getMinMax("max");
            if (fieldValue.length > maxValue) {
              this.errorMessage = `must not be more than ${maxValue} characters`;
            }
            //console.log(maxValue);
          }
        }
      }
      console.log(this.errorMessage);
      console.log(fieldValue);
    },
  },
  computed: {
    ...mapState(["editedAdID"]),
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
select,
input:not([type]),
input[type="text"]:not(.browser-default),
input[type="number"]:not(.browser-default) {
  display: block;
  border-bottom: 2px solid gray;
  width: 80%;
  outline: 2px solid transparent;
  outline-offset: 2px;
  border-radius: 0.25rem;
  margin: auto;
}
label {
  color: #302f2f;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding: 0px 0.25rem;
  display: block;
}
@media (min-width: 640px) {
}
@media (min-width: 768px) {
}
</style>
