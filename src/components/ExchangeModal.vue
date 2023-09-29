<template>
  <q-dialog :model-value="exchange" @update:modelValue="$emit('update:exchange', $event)">
    <q-card>
      <q-card-section>
        <div class="text-h6">Check the currency in the country you are traveling to</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="t-flex t-items-center t-justify-between">
          <div class="t-flex">
            <q-input
              v-model="selectCurrencyValue"
              class="t-w-1/2"
              type="number"
              min="0"
              color="orange-8"
              label="Quantity"
            />
            <q-select
                v-model="selectCurrency"
                :options="currencySymbols"
                class="t-ml-2 t-w-1/2"
                label="Symbol"
                color="orange-8"
            />
          </div>
          <font-awesome-icon :icon="['fas', 'retweet']" class="t-mx-6"/>
          <div class="t-flex">
            <q-input
                v-model="finalCurrencyValue"
                type="number"
                color="orange-8"
                min="0"
                class="t-w-1/2"
                label="Quantity"
            />
            <q-select
                v-model="finalCurrency"
                :options="currencySymbols"
                label="Symbol"
                class="t-ml-2 t-w-1/2"
                color="orange-8"
            />
          </div>

        </div>
        <div class="t-flex t-flex-col t-items-center t-mt-4">
          <button class="modalAcceptButton">Exchange</button>
          <div class="t-flex">
            <p>{{ selectCurrencyValue }}{{ selectCurrency }}</p>
            <p class="t-mx-4">=</p>
            <p>{{ finalCurrencyValue }}{{ finalCurrency }}</p>
          </div>

        </div>
      </q-card-section>

      <q-card-actions align="right">
        <button class="modalAcceptButton" @click="$emit('close')">Close</button>
      </q-card-actions>
    </q-card>

  </q-dialog>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { useQuasar } from 'quasar';
export default {
  props: {
    exchange: Boolean,
  },
  setup(){
    const store = useStore();
    const $q = useQuasar();
    const selectCurrencyValue = ref('');
    const selectCurrency = ref('');
    const finalCurrency = ref('');
    const finalCurrencyValue = ref('');
    const options = ['elo','elo2'];
    const options2 = ['el3','elo4'];
    const currencySymbols = computed(() => {
      const response = store.getters["currency/getSymbols"];
      const symbols = response ? response.symbols : null;
      return symbols ? Object.keys(symbols) : [];
    });
    watch(selectCurrencyValue, (newVal) => {
      if (newVal < 0) {
        selectCurrencyValue.value = 0;
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Quantity must be above 0',
          icon: 'report_problem'
        });
      }
    });

    watch(finalCurrencyValue, (newVal) => {
      if (newVal < 0) {
        finalCurrencyValue.value = 0;
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Quantity must be above 0',
          icon: 'report_problem'
        });
      }
    });

    store.dispatch("currency/fetchSymbols");

    return{
      selectCurrencyValue,
      selectCurrency,
      finalCurrencyValue,
      finalCurrency,
      options,

      options2,
      currencySymbols
    }
  }
}
</script>