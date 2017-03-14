    class Total {
        constructor(area,type,args){
            this.area = area;
            this.map = new Map(args);
            this.input = new Input(area,type,this);
            this.addInputSpan();
            //this.list = new List(this);
            this.bindEvent();
        }

         addToMap(key,value){
            this.map.set(key,value);
            return this.map;
        }
        
        addInputSpan(){
            for(const [key,value] of this.map){
              if(value){
                this.input.addSpan(key,value);
              }          
            }            
        }

        bindEvent(){
            $(".list_sure").on("click",()=>{
               this.input.emptyInput();
               this.addInputSpan();
                $(`${this.area} .list_footer`).css("display","none");
            });

            $(".list_choose").on("click",()=>{
               $(`${this.area} .list_footer`).css("display","block");
            });
        }
    }
    
    class Input {
        constructor(area,type,total){
           this.input = $(`${area} .text_input_area`);
           this.area = area;
           this.total = total;
           this.type = type;
           this.list = new List(this.area,this.type,total);
           switch(type){
               case "addcutlist":this.item = Spanitem;break;
               case "hooklist":this.item = Hookspanitem;break;
           }
           this.removeEventBind();
        }
        
        addSpan(text,count){
            const span = new this.item(text,count);
            this.input.prepend(span.spanStr);
        }

       removeEventBind(){
            this.input.on("click",".input_item_remove",(e)=>{
                const node = $(e.target).closest(".text_input_item");
                node.remove();
                console.log(this.total.addToMap(node.attr("textContent"),0));
                this.list = new List(this.area,this.type,this.total);
            })
        }

         emptyInput(){
           this.input.html("");
        }


    }

    class Spanitem {
        constructor(text,count){
          this.spanStr = `<span class="text_input_item" textContent=${text}>${text}*${count}<span class="input_item_remove">x</span></span>`;
          this.key = text;
        }
    }
    
    class Hookspanitem{
        constructor(text){
            this.spanStr = `<span class="text_input_item" textContent=${text}>${text}<span class="input_item_remove">x</span></span>`;
            this.key = text;
        }
    }

    class List {
        constructor(area,type,total){
            this.total = total;
            this.node = $(`${area} .list_body`);
            this.node.html("");
            switch(type){
                case "addcutlist":this.item = Listitem;break;
                case "hooklist":this.item = Hookitem;break;
            }            
           for(const [key,value] of total.map){
              const item = new this.item(key,value,total);
              this.node.append(item.itemStr);   
           }
            this.item.bindButtonEvent(total);   
        }
    }

    class Listitem{
       constructor(key,value,total){
         this.key = key;
         this.value = value;
         this.total = total;
         this.itemStr = `<li><span class="option_label option_label_cut">-</span><span class="content">${this.key}</span><span class="option_label option_label_add">+</span><span class="number">${this.value}</span><span class="double">*</span></li>`;
       }

       static bindButtonEvent(total){
           console.log(1);
           $(".option_label_cut").on("click",(e)=>{
               const node = $(e.target).closest("li");
               let num = node.find(".number").html();
               if(num === "0"){
                   return;
               }
               let value = --num;
                node.find(".number").html(value);
                const key = node.find(".content").html();
                console.log(total.addToMap(key,value));
           });

           $(".option_label_add").on("click",(e)=>{
               const node = $(e.target).closest("li");
               let num = node.find(".number").html();
               let value = ++num;
               node.find(".number").html(value);
               const key = node.find(".content").html();
               console.log(total.addToMap(key,value));
           });
       }
    }
    
    class Hookitem{
      constructor(key,value,total){
           this.key = key;
           this.value = value ? "checked" : "";
           this.total = total;
           this.itemStr = `<li><input type="checkbox" name="" value="" class="hook" ${this.value}><span>${this.key}</span></li>`;
      }

      static bindButtonEvent(total){
         $(".hook").on("click",(e) => {
             const node = $(e.target);
             const key = node.next().html();
             const value = node.is(':checked');
             console.log(total.addToMap(key,value));
         });
      }
    }
