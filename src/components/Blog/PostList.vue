<template>
    <div>
        <h1>Post list</h1>

        <div  v-for="(item, index) in descriptions" :key="index" :item="item">
            <!-- <span>{{item}}</span> -->
          
           <p>{{item.title}}  {{item.url}}</p>
          
           <p>{{item.by}}</p>

           <!-- <p v-for="(comment , i) in comments" :key="i">
               <span v-if="comment.type == 'comment'"></span>
           </p> -->
           
         </div> 

         <h1>
             Comment List
         </h1>
         <div v-for="(comment, index) in comments" :key="index" :comment="comment">
             <p>{{comment.title}}</p>
             
         </div>
        
    </div>
</template>

<script>

export default {
    data(){
        return{
            displayedItems:[],
            descriptions:{},
            i:0,
            comments:{}
        }
    },

    methods: {
        postList(){
            this.axios.get("https://hacker-news.firebaseio.com/v0/topstories.json")
        .then(response => {

            console.log(response);
         
          this.displayedItems = response.data;
          console.log(this.displayedItems, 'array');

           var id;
             this.displayedItems.forEach(function(entry) {
                 id = entry;
                 console.log(id);
                   
            });

              this.postDescription(id);
              this.commentList(id);
         
         
         
        })
        .catch(error => {
          console.log(error.response);
        });
    },

    postDescription(element){          


         this.axios.get("https://hacker-news.firebaseio.com/v0/item/"+element+".json")
        .then(response => {

            console.log(response, 'descriptions');
            setTimeout(() => { this.descriptions = response; }, 2000)
         
         
        })
        .catch(error => {
          console.log(error.response);
        });

    },

    commentList(id){

         this.axios.get("https://hacker-news.firebaseio.com/v0/item/"+id+".json")
        .then(response => {

            console.log(response.data, 'comments');
         
          this.comments = response;
        })
        .catch(error => {
          console.log(error.response);
        });

    }

           

    
            
        
    },
    mounted(){

    },
    created(){
       
        //  this.displayedItems.forEach(function(entry) {
        //          console.log(entry, 'entry');
        //              this.postDescription(entry);
        //     });
       
        this.postList();
        this.postDescription();
        this.commentList();
    }
    
}
</script>


