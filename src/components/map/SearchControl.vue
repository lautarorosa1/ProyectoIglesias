<template>
  <div class="search-control">

    <input
      ref="searchInput"
      v-model="search"
      placeholder="🔍 Buscar ciudad o iglesia..."
      @focus="handleFocus"
      @keydown.esc="showResults=false"
    />


    <div
      v-if="showResults"
      class="results"
    >

      <div
        v-if="!search && displayedItems.length"
        class="recent-title"
      >
        Últimas búsquedas
      </div>


      <div
        v-if="!displayedItems.length"
        class="empty"
      >
        No hay resultados
      </div>


      <div
        v-for="item in displayedItems"
        :key="item.type + item.name"
        class="result-item"
        :class="{recent:!search}"
        @click="selectItem(item)"
      >

        <span class="icon">
          <img
            v-if="item.type === 'church'"
            :src="item.church?.tipo === 'secundaria' ? churchIcon2 : churchIcon"
            alt=""
          />
          <template v-else>📍</template>
        </span>


        <div class="info">

          <strong>
            {{item.name}}
          </strong>


          <small>
            {{item.type === "city" ? "Ciudad" : `Iglesia - ${item.church?.ciudad ?? ""}`}}
          </small>

        </div>

      </div>


    </div>

  </div>
</template>



<script setup>

import {ref,computed} from "vue";

import churchIcon from "@/assets/icons/church-marker.svg";
import churchIcon2 from "@/assets/icons/church-marker-small.svg";

const props = defineProps({

  items:{
    type:Array,
    required:true
  },


  recent:{
    type:Array,
    default:()=>[]
  }

});


const emit = defineEmits([
  "select",
  "focus"
]);


const search = ref("");

const showResults = ref(false);

const searchInput = ref(null);



function close(){

  showResults.value=false;

}



function blurInput(){

  searchInput.value?.blur();

}



defineExpose({

  close,
  blurInput

});



const displayedItems = computed(()=>{


  if(search.value.trim()){

    return props.items.filter(item =>

      item.name
      .toLowerCase()
      .includes(
        search.value.toLowerCase()
      )

    );

  }


  return props.recent;


});



function handleFocus(){

  showResults.value = true;

  emit("focus");

}



function selectItem(item){


  console.log(
    "ENVIANDO ITEM:",
    item
  );


  emit(
    "select",
    {
      ...item
    }
  );



  search.value="";

  showResults.value=false;



  setTimeout(()=>{

    document.activeElement.blur();

  },100);


}


</script>



<style scoped>


.search-control{

  flex:1;
  min-width:0;

}



input{

  width:100%;

  height:48px;
  box-sizing:border-box;

  padding:13px 16px;

  border:0;

  outline:0;

  border-radius:12px;

  background:white;

  font-size:16px;


  box-shadow:
    0 4px 15px rgba(0,0,0,.18);

}



.results{

  margin-top:8px;

  background:white;

  border-radius:12px;

  overflow:hidden;

  max-height:350px;

  overflow-y:auto;


  box-shadow:
    0 8px 25px rgba(0,0,0,.18);

}



.recent-title{

  padding:10px 15px;

  font-size:12px;

  font-weight:600;

  color:#888;

  text-transform:uppercase;

  border-bottom:1px solid #eee;

}



.empty{

  padding:15px;

  color:#777;

  font-size:14px;

}



.result-item{

  display:flex;

  align-items:center;

  gap:12px;

  padding:12px 15px;

  cursor:pointer;

  transition:.2s;

}



.result-item:hover{

  background:#f5f5f5;

}



.icon{

  display:flex;

  align-items:center;

  justify-content:center;

  width:22px;

  height:22px;

  font-size:22px;

  flex-shrink:0;

}

.icon img{

  width:100%;

  height:100%;

  object-fit:contain;

}



.info strong{

  display:block;

  font-size:15px;

}



.info small{

  color:#777;

  font-size:12px;

}



.result-item.recent strong{

  color:#777;

}



.result-item.recent .icon{

  opacity:.6;

}

@media (max-width: 600px) {
  .search-control {
    flex: none;
    width: 180px;
  }
}


</style>