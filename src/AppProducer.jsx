import React from 'react'

export default function AppReducer(store={
    users:[
        {
            displayed:false,
            userName:"dan@",
            password:"123456",
            mycart:[],
            details:{
                private:{
                    firstName:"Daniel",
                    lastName:"Tsirkin",
                    phoneNumber:"058-6145677",
                    email:"dantsirkin@gmail.com",
                    gender:"Male",
                    birthday:"2003-09-13",
                },
                payment:{
                    cardNumber:"1234 5678 9101 1121",
                    expiryMonth:"11",
                    expiryYear:"2027",
                    cvv:"123"
                },
                delivary:{
                    city:"Jerusalem",
                    street:"Zeev Falk",
                    houseNumber:5,
                    isPrivate:false,
                    entry:0,
                    floor:-1,
                    apartment:3
                }
            },
            
            purchases:[]
        },
        {
            displayed:false,
            userName:"daniel@",
            password:"789101112",
            mycart:[],
            details:{
                private:{
                    firstName:"David",
                    lastName:"Tsirkin",
                    phoneNumber:"058-6145688",
                    email:"davidtsirkin@gmail.com",
                    gender:"Female",
                    birthday:"2013-06-23",
                },
                payment:{
                    cardNumber:"1234 5678 9101 8888",
                    expiryMonth:"12",
                    expiryYear:"2029",
                    cvv:"123"
                },
                delivary:{
                    city:"Jerusalem",
                    street:"Zeev Falk",
                    houseNumber:5,
                    isPrivate:true,
                    entry:0,
                    floor:-1,
                    apartment:3
                }
            },
            
            purchases:[]
        }
    ]
    ,products:{
    vegetables: [
        { name: "tomatoes", img: "https://veggies.my/cdn/shop/products/Tomatoes@2x.png?v=1653972536", brand: "HaHaklai | tomatoes", price: 2 },
        { name: "cucamber", img: "https://st1.foodsd.co.il/Images/Products/large/yi3Jahi8SRmJwSht.jpg", brand: "HaHaklai | cucumbers", price: 1.5 },
        { name: "carrots", img: "https://media.istockphoto.com/id/166106089/photo/carrot-isolated.jpg?s=612x612&w=0&k=20&c=bWUuopSQ247cy0k6IzvVnrgixff496_HmIBjtiUzzDM=", brand: "Fresh Farms | carrots", price: 1.8 },
        { name: "bell peppers", img: "https://media.istockphoto.com/id/1130564105/photo/sweet-pepper-paprika-isolated-on-white-background-clipping-path-full-depth-of-field.jpg?s=612x612&w=0&k=20&c=m_01GdGMntpr6B3tiplqxbtPN8zTKN1xfucAaBu3Mkw=", brand: "Organic Farms | bell peppers", price: 2.2 },
        { name: "broccoli", img: "https://media.istockphoto.com/id/1135308302/photo/broccoli-on-white.jpg?s=612x612&w=0&k=20&c=ONhL9A0yMth8m-83Z8eAwzAsDeKU81IcpZc-2rVDMJo=", brand: "Green Harvest | broccoli", price: 2.5 },
        { name: "spinach", img: "https://media.istockphoto.com/id/537828836/photo/spinach.jpg?s=612x612&w=0&k=20&c=eol1f8xW3wK6OYoP7udaATP6fJmNuHCBi5WYk63fPIQ=", brand: "Fresh Greens | spinach", price: 1.9 },
        { name: "zucchini", img: "https://media.istockphoto.com/id/1149201983/photo/fresh-whole-and-sliced-zucchini-isolated-on-white-background-from-top-view-courgette-zucchini.jpg?s=612x612&w=0&k=20&c=8r6T0Lk1iRw0mkbSCMSMKuamrFyvo0QrQD25_jiq10w=", brand: "Local Farms | zucchini", price: 2.3 },
        // Add similar entries for other new vegetable products with their respective image URLs
      ],
      fruits: [
        { name: "oranges", img: "https://producemadesimple.ca/wp-content/uploads/2015/01/orange-web-600x450.jpg", brand: "HaHaklai | oranges", price: 2.5 },
        { name: "watermelon", img: "https://i5.walmartimages.com/seo/Fresh-Personal-Watermelon-Each_14487aaf-d86a-4b46-acaf-7621b90286bb.fb737768267fcdc95c33f355b730ad15.jpeg", brand: "HaHaklai | watermelons", price: 1.7 },
        { name: "bananas", img: "https://media.istockphoto.com/id/173242750/photo/banana-bunch.jpg?s=612x612&w=0&k=20&c=MAc8AXVz5KxwWeEmh75WwH6j_HouRczBFAhulLAtRUU=", brand: "Tropical Delights | bananas", price: 1.3 },
        { name: "grapes", img: "https://media.istockphoto.com/id/803721418/photo/grape-dark-grape-grapes-with-leaves-isolated-with-clipping-path-full-depth-of-field.jpg?s=612x612&w=0&k=20&c=-jAJlO3WbgFzxwwSmG3pc7bqUva117TYUKKrQW3-RK8=", brand: "Vineyard Fresh | grapes", price: 3 },
        { name: "kiwi", img: "https://media.istockphoto.com/id/482728017/photo/kiwi.jpg?s=612x612&w=0&k=20&c=bBHFCNDXhcD2zRc6YmkrZu6ytTwMUeSRRdM1VVc1Dog=", brand: "Exotic Fruits | kiwi", price: 2.8 },
        { name: "apples", img: "https://media.istockphoto.com/id/495878092/photo/red-apple.jpg?s=612x612&w=0&k=20&c=M2ndFI1v2erJM18q1Cd1QCM8jqBlRKLc1nLE9BNp-EY=", brand: "Crisp Farms | apples", price: 2 },
        { name: "strawberries", img: "https://media.istockphoto.com/id/1412854156/photo/strawberries-isolated-strawberry-whole-and-a-half-on-white-background-strawberry-slice-with.jpg?s=612x612&w=0&k=20&c=sg8D6YofX0K9og_ugF4R50QrPAKQUvHn5vJGfr-7Zk4=", brand: "Berry Bliss | strawberries", price: 3.2 },
        // Add similar entries for other new fruit products with their respective image URLs
      ],
      diaries: [
        { name: "milk", img: "https://shoppy.co.il/cdn/shop/products/tnuva3_milk_300x300.png?v=1637090060", brand: "Tnuva | milk", price: 2 },
        { name: "cheese", img: "https://zekhron-admin.yevolis.co.il//Images/842f8e0b-b0de-42b3-9451-92c87e21147f.png", brand: "Tnuva | cheese", price: 5 },
        { name: "yogurt", img: "https://s3.eu-central-1.amazonaws.com/images-il.rexail.com/images/products/bc242e32e9d9f0d3a18c5a04a8fb1bcb.jpg", brand: "Muller | yogurt", price: 2.5 },
        { name: "butter", img: "https://www.pinkbaking.co.il/images/itempics/7290000043111_231120211202181_large.jpg", brand: "Tnuva| butter", price: 3 },
        { name: "ice cream", img: "https://www.benjerry.co.il/wp-content/uploads/2020/09/cookie-dough-234x300.png", brand: "Ben & Jerries | ice cream", price: 4 },
        { name: "eggs", img: "https://media.istockphoto.com/id/171206679/photo/egg-carton-isolated-clipping-path.jpg?s=612x612&w=0&k=20&c=NXiThdkBiG9WMptlc5SpwhxR3iriKn2gnJHztTRQsgU=", brand: "Farm Fresh | eggs", price: 2.2 },
        { name: "sour cream", img: "https://s3.eu-central-1.amazonaws.com/images-il.rexail.com/images/products/8af5bc3b3d0a8f21cb5959f10c586af0.jpg", brand: "Tnuva | sour cream", price: 2.8 },
        // Add similar entries for other new dairy products with their respective image URLs
      ],
      meat: [
        { name: "chicken", img: "https://www.ameat.co.il/images/itempics/10101_11052020231651.jpg", brand: "HaShohet | chickens", price: 10 },
        { name: "steak", img: "https://c8.alamy.com/compes/2jrbktr/filete-de-ternera-crudo-fresco-con-hueso-y-romero-aislado-sobre-fondo-blanco-2jrbktr.jpg", brand: "HShohet | steaks", price: 20 },
        { name: "sausages", img: "https://media.istockphoto.com/id/121176549/photo/close-up-of-grilled-bratwurst-on-white-background.jpg?s=612x612&w=0&k=20&c=h2JIpa6jQTGARvidji8mpchTU3pIywmAOUBNcXe97Lc=", brand: "Grill Masters | sausages", price: 12 },
        { name: "bacon", img: "https://media.istockphoto.com/id/508755080/photo/cooked-bacon-rashers-close-up-isolated-on-a-white-background.jpg?s=612x612&w=0&k=20&c=XLmDH3d2J50Q1y7rufm9VE6Q_o8p7-0MY_e2NFTa6lA=", brand: "Smoky Flavors | bacon", price: 15 },
        { name: "lamb chops", img: "https://media.istockphoto.com/id/105489252/photo/rack-of-lamb-with-rosemary.jpg?s=612x612&w=0&k=20&c=O1Vpfvq9_TZOsuy0QdaXyx3sFOvH3kGf29nPBZB_aHY=", brand: "Meadow Fresh | lamb chops", price: 18 },
        { name: "ground beef", img: "https://media.istockphoto.com/id/1341859890/photo/extra-lean-ground-beef.jpg?s=612x612&w=0&k=20&c=YY1sGR4QlGO5AWiO8R8EN-JjqEVMXGe6UpOSappLz70=", brand: "Prime Cuts | ground beef", price: 14 },
        { name: "salmon fillet", img: "https://media.istockphoto.com/id/157641208/photo/a-large-pink-salmon-fillet-isolated-on-a-white-background.jpg?s=612x612&w=0&k=20&c=f6dDcUpFhv8Slk-pm2zV9TvMtwhqRckEJo5KQbwbElY=", brand: "Ocean Harvest | salmon fillet", price: 22 },
        // Add similar entries for other new meat products with their respective image URLs
      ],
      housekeepers: [
        { name: "broom", img: "https://www.mitre10.com.au/media/catalog/product/2/5/2542660-0.jpg", brand: "Maxtok | brooms", price: 3 },
        { name: "vacuum cleaner", img: "https://i5.walmartimages.com/seo/Tineco-FLOOR-ONE-S2-Smart-Cordless-Wet-Dry-Vacuum-Cleaner-and-Floor-Washer-Black_97f28b37-eb96-4b3f-abc2-72bab4cf3d8c.a8732ca5cf5d4dc3410de7ccc2d7b7e8.jpeg", brand: "Tineco | vacuum cleaners", price: 20 },
        { name: "dish soap", img: "https://media.istockphoto.com/id/157189160/photo/dish-soap.jpg?s=612x612&w=0&k=20&c=l2jTJl00iKgcI65qDaz-YqWpGrhqS0HaTfPFvyCnoEM=", brand: "Sparkling Clean | dish soap", price: 2 },
        { name: "laundry detergent", img: "https://media.istockphoto.com/id/187248786/photo/laundry-detergent-bottle.jpg?s=612x612&w=0&k=20&c=VaW8kIe5fUMRW5bEgTxm0W714MphYxW1yNwmVgOKQnA=", brand: "Fresh Breeze | laundry detergent", price: 5 },
        { name: "paper towels", img: "https://www.sano.co.il/media/SA7290005427107b-1-1-253x300.jpg", brand: "Soft Touch | paper towels", price: 2.5 },
        { name: "trash bags", img: "https://media.istockphoto.com/id/173889659/photo/garbage-bag-roll.jpg?s=612x612&w=0&k=20&c=4kVuu17FzmVoRAZa11H3FSBrv9cBC3HJEtTcyWdybB0=", brand: "Odor Shield | trash bags", price: 3 },
        { name: "cleaning spray", img: "https://media.istockphoto.com/id/969720440/photo/spray-bottle-isolated.jpg?s=612x612&w=0&k=20&c=2N8dadUKXuwQgi53z_3Lo2kp-ZtmDkhGIltDtAygPtc=", brand: "Gleam & Shine | cleaning spray", price: 4 },
        // Add similar entries for other new housekeeper products with their respective image URLs
      ]
}},action) {
    switch(action.type){
        case ("ADDNEW"):
            let temp10 = store.users;
            if (temp10[action.userIndex]) {
                temp10[action.userIndex].mycart = [...temp10[action.userIndex].mycart, action.product];
            }
            return { users: temp10, products: store.products };
        case "ADDEXIST":
            const temp = store.users
            temp[action.userIndex].mycart[action.product.index].amount += Number(action.product.amountToAdd)
            return {users:temp,products:store.products}
        case "REMOVE":
              const temp7=store.users
             temp7[action.userIndex].mycart=temp7[action.userIndex].mycart.filter(product=>product.name!=action.name)
            return {users:temp7,products:store.products}
        case "CHANGEAMOUNT":
             const temp6 = store.users
            temp6[action.userIndex].mycart[action.index].amount = Number(action.amount)
            return {users:temp6,products:store.products}
        case "PURCHASED":
            const temp2=store.users
            temp2[action.userIndex].purchases=[...temp2[action.userIndex].purchases,action.purchase]
            temp2[action.userIndex].mycart=[]
            return {users:temp2,products:store.products}
        case "ADDPRODUCT":
            const temp1 =  store.products
            temp1[action.class]=[...temp1[action.class],action.product]
            return {users:users,products:temp1}
        case "EDITPRODUCT":
            let temp3 =  store.products
            const temp4=store.users
            temp4.forEach(user=>{
                const i = user.mycart.indexOf(user.mycart.find(prod=>prod.name==action.product.name))
                if (user.mycart[i]) {
                    user.mycart[i].img = action.product.img;
                    user.mycart[i].price = action.product.price;
                  }
            })
            temp3[action.class][action.index]=action.product
            return {users:temp4,products:temp3}
        case "REMOVEPRODUCT":
            const temp5 = store.products
            temp5[action.class]=temp5[action.class].filter(prod=>prod.name!=action.name)
            const temp8=store.users
            temp8.forEach(user=>{
                user.mycart=user.mycart.filter(prod=>prod.name!=action.name)
            })
            return {users:temp8,products:temp5}
        case "UPDATEPRIVATE":
            const temp9=store.users
            temp9[action.userIndex].details.private=action.dat
            return {users:temp9,products:store.products}
            case "UPDATEPAYMENT":
                const temp11=store.users
                temp11[action.userIndex].details.payment=action.dat
                return {users:temp11,products:store.products}
            case "UPDATEDELIVARY":
                    const temp12=store.users
                    temp12[action.userIndex].details.delivary=action.dat
                    return {users:temp12,products:store.products}
                case "LOGIN":
                    const temp13=store.users
                    temp13[action.userIndex].displayed=true
                    return {users:temp13,products:store.products}
                case "NEWUSER":
                    return {users:[...store.users,action.user],products:store.products}
                case "CHANGEPASSWORD":
                    let temp20=store.users
                    temp20[action.userIndex].password=action.password
                    return {users:temp20,products:store.products}
        default:
            return store
    }
}
