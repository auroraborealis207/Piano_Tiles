var n = 1;
var Buttons=document.getElementsByClassName("button");
var window_size;
const div_selector = document.querySelector("#Buttons")
var image_string= "<img class=\"button\" src=\"Images\\Default Button.png\" >"

var points = 0
var level="hard"



var Buttons_Clickable = true;
var time = 900;//1000; //ms
var top_margin = 0
var left_margin = 0
var image_width = ''


var row = 4
if (level == "easy"){
    row = 4
    image_width = "150px"
}else if (level == "hard"){
    row=6
    image_width = "100px"
}
var col = row
var no_of_buttons=row*col;
div_selector.innerHTML = image_string.repeat(row*col)
var counter = [];
var press_counter = [];
var Button_images = ["Images\\Default Button.png","Images\\Purple Button.png","Images\\Green Button.png","Images\\Red Button.png","Images\\Orange Button.png","Images\\Yellow Button.png","Images\\Blue Button.png"];
var button_pressed = 0


var num_images_global = Button_images.length;
var color_counter_global = 1;
var button_num = 1

function respond_on_click(e){
    
    if (level=="easy" && press_counter.includes(e.target.id)){
        console.log("button already Clicked")
    }else if (Buttons_Clickable == false){
        console.log("Dont Respond to click")
        
    }else{
        console.log("Respond _on Click:");
        object=e.target;
        var id_button = object.id;
        button_pressed = parseInt(id_button)
        console.log("id_button:",id_button)
        console.log(object);
        object.src = Button_images[color_counter_global];
        console.log(Button_images[color_counter_global]);

        color_counter_global+=1;
        if (color_counter_global==num_images_global){
            color_counter_global=1;
            console.log("Color counter reset");
        }
        
        press_counter.push(button_pressed)
        console.log(press_counter)
        console.log("counter",counter[press_counter.length-1])
        console.log("Button pressed" , button_pressed)
        // console.log(((button_pressed in counter) == false) && level=="easy")
        // console.log(button_pressed in counter)
        // console.log(10 in [10])
        if ((button_pressed != counter[press_counter.length-1] && level=="hard") || 
                (((counter.includes(button_pressed) == false) && level=="easy"))){
            //end_screen()//to be implemented
            console.log("Wrongly pressed")
            restart_level()
        }else if(press_counter.length == counter.length){
            points+=1
            color_counter = 1
            setTimeout(restart,time)
        }    
        
    }
}

function start_level(){
    start()
}

function restart_level(){
    reset_buttons()
    Buttons_Clickable = false
    press_counter = [];
    color_counter_global = 1
    counter = []
    setTimeout(start,time)

}

function start(){
    // if (counter.length==9){
    //     return end_game();
    // }
    add_Simon();
    display_Simon();
    console.log("Start");
}

function restart(){
    setTimeout(reset_buttons,time/2)
    press_counter = [];
    color_counter_global = 1
    setTimeout(start,time)
}

function end_game(){
    //code for stoping game and displaying points
    n=1;
}

function reset_buttons(){
    for( var i=0;i<no_of_buttons;i++){
        Buttons[i].src = Button_images[0] ;
    }
}

function add_Simon(){
    var counter_len = counter.length
    if (counter_len == no_of_buttons){
        end_game()
    }
    while (true){
        button_num=Math.floor(Math.random()*9+1);
        if (counter.includes(button_num)){
            n=1;
        }else{
            counter.push(button_num);
            break
        }
    
    button_num=Math.floor(Math.random()*(row*col)+1);
    counter.push(button_num);
    }
}

function display_Simon(){
    var i = counter.length;
    var i_copy = i;
    var color_counter = 1;
    var object = Buttons[0];

    Buttons_Clickable=false;

    console.log("Display Simon",2);

    for (i;i>0;i--){
        //console.log("i Copy",i_copy-i);
        //console.log(Buttons[counter[i_copy - i]]);
        var object = Buttons[counter[i_copy - i]-1];
        //console.log(object)

        setTimeout(change_image,time*(i_copy-i),object,color_counter);
        //console.log(i_copy-i)
        //Buttons[counter[i_copy - i]].src = Button_images[color_counter];

        
        color_counter +=1;

        if (color_counter==num_images_global){
            color_counter = 1;
            
        }

        console.log("Colour Counter:",color_counter);
    }
    setTimeout(Buttons_Clickable_is_true,time*(i_copy+1));
    setTimeout(reset_buttons,time*(i_copy+1));
}                

function change_image(object,color_counter){
    object.src = Button_images[color_counter];
}

function Buttons_Clickable_is_true(){
    Buttons_Clickable = true
}


if (level=="easy"){
    top_margin = 150
    left_margin = 161
}else if(level=="hard"){
    top_margin = 105
    left_margin = 110
}


console.log(Buttons);

console.log(Button_images[1]);

for(var i=0;i<row;i++){
    var n1 =(top_margin*(i));//150
    for(var j=0;j<col;j++){
        var n2 =(left_margin*j);//23
        var num = col*i+j+1
        try{
            Buttons[col*i+j].style.top=n1.toString()+"px";
            //Buttons[col*i+j].style.top="min 20px";
            Buttons[col*i+j].style.left=n2.toString()+"px";
            Buttons[col*i+j].style.width = image_width
            Buttons[col*i+j].id =num.toString()
            console.log(Buttons[col*i+j].id)
            Buttons[col*i+j].addEventListener("click",respond_on_click);

            //Buttons[col*i+j].src = Button_images[0];
            }
        catch{n=1};
        
    };
};

start_level()

//window.addEventListener("resize", displayWin);

//start()