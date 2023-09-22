<template>
  <q-menu
      v-model="showPropertyType"
      anchor="bottom right"
      self="top right"
      class="t-w-80"
  >
    <q-card>
      <q-card-section>
        <div class="text-h6">Set price range</div>
      </q-card-section>
      <q-card-section>
        <div class="t-flex t-flex-col t-px-1">


          <q-card-actions align="right" class="t-mt-3 t-text-sm">
            <button class="t-mr-4 t-p-2">Reset</button>
            <button class="modalAcceptButton">Apply</button>
          </q-card-actions>
        </div>
      </q-card-section>
    </q-card>
  </q-menu>
</template>

<script>

export default {
  setup(){


    return{

    }
  }
}
</script>

<style scoped>
</style>
