<template>
  <div>
    <h1>Post list</h1>

    <!-- <div v-for="(item, index) in posts" :key="index" :item="item">
      <span v-if="item !=null">{{item.title}}</span>

      <p>{{item.title}}  </p>
           <p>{{item.url}}</p>
          
      <p>{{item.by}}</p>

      <p v-for="(comment , i) in comments" :key="i">
               <span v-if="comment.type == 'comment'"></span>
      </p>
    </div> -->
    
    <div v-for="(post, index) in postRootNodes" :key="index" :item="post">
        <h1> Post </h1>
        <span> {{post.text}} </span>
        <h2> comments </h2> <span> {{post.children.length}} </span>
        <div v-for="(comment, index2) in post.children" :key="index2" :item="comment">
            
            <span> {{comment.text}} </span>
        </div>
    </div>
    <!-- <h1>
             Comment List
         </h1>
         <div v-for="(comment, i) in comments" :key="i" :comment="comment">
             <p>{{comment.title}}</p>
             
         </div>
    -->
  </div>
</template>

<script>
import Node from '@/components/Blog/Node';
export default {
  data() {
    return {
      displayedItems: [],
      posts: [],
      i: 0,
      comments: [],
      postRootNodes: []
    };
  },

  methods: {
    getChildren(n) {
        console.log("child", n.children);
        //console.log(n.children.map(child => child.text));
        n.children.forEach(child => {
            console.log(child);
        })
        return n.children.map(child => child.text);
    },
  
    getPostList() {
      this.axios
        .get("https://hacker-news.firebaseio.com/v0/topstories.json")
        .then(response => {
          console.log(response);

          this.displayedItems = response.data;

          //    var id;
          this.displayedItems.slice(0, 5).forEach(post_id => {
            this.getPost(post_id);
          });

          //   this.commentList(id);
        })
        .catch(error => {
          console.log(error.response);
        });
    },

    getPost(post_id) {
        
      this.axios
        .get("https://hacker-news.firebaseio.com/v0/item/" + post_id + ".json")
        .then(response => {
           console.log(response, 'posts');
          this.posts.push(response.data);
            let postNode = new Node(post_id);
            postNode.getChildrenNodes();
            this.postRootNodes.push(postNode);
            console.log("post "+post_id+" "+postNode);
            console.log(postNode);

        //   this.axios
        //     .get("https://hacker-news.firebaseio.com/v0/item/" + 123 + ".json")
        //     .then(response => {
        //       console.log(response.data, "comments");

        //       this.comments = response;
        //     })
        //     .catch(error => {
        //       console.log(error.response);
        //     });
        })
        .catch(error => {
          console.log(error.response);
        });
    },

    // commentList() {
    //   this.posts.slice(1, 5).forEach(entry => {
    //     this.comments.push(entry);
    //   });
    //   console.log(this.comments, "entry");
    // }
  },
  mounted() {},
  created() {
    //  this.displayedItems.forEach(function(entry) {
    //          console.log(entry, 'entry');
    //              this.postDescription(entry);
    //     });

    this.getPostList();
    this.getPost();
  }
};
</script>


