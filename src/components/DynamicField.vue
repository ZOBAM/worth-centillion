<template>
  <template v-if="field.length > 1">
    <label for="" class="tw-block tw-text-xs tw-font-semibold tw-px-1">{{
      index.split(":")[0]
    }}</label>
    <select
      :name="index.split(':')[1]"
      id=""
      class="tw-w-4/5 md:tw-w-2/3 tw-outline-none tw-border-0 tw-border-b-2 tw-border-gray-400 focus:tw-outline-none focus:tw-border-transparent tw-rounded"
    >
      <option
        v-for="opt of field"
        :key="opt"
        :selected="adDetails[index.split(':')[1]] == opt"
        :value="opt"
        >{{ opt }}</option
      >
    </select>
  </template>
  <template v-else>
    <label for="" class="tw-block tw-text-xs tw-font-semibold tw-px-1">{{
      index.split(":")[0]
    }}</label>
    <input
      type="text"
      :name="index.split(':')[1]"
      id=""
      :value="adDetails[index.split(':')[1]]"
      @change="checkValue($event, field[0])"
      class="tw-w-4/5 tw-md:w-2/3 tw-outline-none tw-border-0 tw-border-b-2 tw-border-gray-400 focus:tw-outline-none focus:tw-border-transparent tw-rounded"
    />
    <span
      class="tw-block tw-text-red-500 tw-text-sm"
      v-if="errors[index.split(':')[1]]"
      >{{ errors[index.split(":")[1]] }}</span
    >
    <!-- <ErrorMessage :name="index.split(':')[1]" class="tw-block tw-text-red-500 tw-text-sm" /> -->
  </template>
</template>
<script>
export default {
  name: "DynamicField",
  props: ["field", "index", "adDetails", "fieldValue"],
  components: {},
  data() {
    return {
      errors: {},
      validationRule: null,
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
      let fieldName = e.target.name;
      let fieldValue = e.target.value;
      /* //prevent the input from reverting to former values
      if (this.adDetails) {
        let intervalCount = 0;
        let intervalVar = setInterval(() => {
          e.target.value = fieldValue;
          console.log(fieldValue);
          intervalCount++;
          if (intervalCount > 2) {
            clearInterval(intervalVar);
          }
        }, 10);
      } */
      this.errors[fieldName] = false;
      //let ruleArray = this.validationRule.split("|");
      //console.log(ruleArray);
      if (fieldValue.trim() == "") {
        //check empty string
        this.errors[fieldName] = "This field is required";
        alert("You cannot save empty value for: " + fieldName);
      } else {
        if (this.validationRule.indexOf("numeric") != -1) {
          if (isNaN(fieldValue)) {
            //validate numeric
            this.errors[fieldName] = `${fieldName} must be a number`;
            //alert('this field must be of number type');
          } else {
            if (this.validationRule.indexOf("min")) {
              //check if passed min requirement
              let minValue = this.getMinMax("min");
              if (fieldValue < minValue) {
                this.errors[fieldName] = `must not be less than ${minValue}`;
              }
            }
            if (this.validationRule.indexOf("max")) {
              //check if passed min requirement
              let maxValue = this.getMinMax("max");
              if (fieldValue > maxValue) {
                this.errors[fieldName] = `must not be more than ${maxValue}`;
              }
            }
          }
        } else {
          //validate string
          if (this.validationRule.indexOf("min")) {
            //check if passed min requirement
            let minValue = this.getMinMax("min");
            if (fieldValue.length < minValue) {
              this.errors[
                fieldName
              ] = `must be at least ${minValue} characters`;
            }
            //console.log(minValue);
          }
          if (this.validationRule.indexOf("max")) {
            //check if passed min requirement
            let maxValue = this.getMinMax("max");
            if (fieldValue.length > maxValue) {
              this.errors[
                fieldName
              ] = `must not be more than ${maxValue} characters`;
            }
            //console.log(maxValue);
          }
        }
      }
      console.log(this.errors);
      alert(fieldValue);
    },
  },
  computed: {},
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
