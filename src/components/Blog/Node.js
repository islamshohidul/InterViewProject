import axios2 from 'axios'

function Node(id) {
    this.text = '';
    this.id = id;
    this.children = [];
    this.parent = null;
    
    this.getChildrenNodes = function() {
        
        //console.log('recursive', this.text,' ', this.id);
          axios2
            .get("https://hacker-news.firebaseio.com/v0/item/" + this.id + ".json")
            .then(response => {
                // console.log(response.data, "comments");
                if (response.data.text)
                    this.text = response.data.text;

                if (response.data.title) {
                    this.text = response.data.title;
                }

                if (response.data && response.data.kids) {
                    for(let i = 0; i < response.data.kids.length; i++) {
                        let node = new Node(response.data.kids[i]);
                        node.getChildrenNodes();
                        this.addChild(node);
                    }
                }

            })
            .catch(error => {
            console.log(error.response);
            });
    }

    this.setParentNode = function(node) {
        this.parent = node;
    }

    this.getParentNode = function() {
        return this.parent;
    }

    this.addChild = function(node) {
        node.setParentNode(this);
        this.children[this.children.length] = node;
    }
}
export default Node