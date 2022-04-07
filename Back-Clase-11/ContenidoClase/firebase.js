let { db: firebaseDB } = require("./utils/firebase");


(async ()=>{
    try {
        let coloresArry = [
            {nombre:'blue'},
            {nombre:'green'},
            {nombre:'yellow'},
            {nombre:'red'}
        ];
        let colores = firebaseDB.collection('colores');
        for (const color of coloresArry) {
            // await colores.doc().set(color);
        }
        let db_arr_colores = [];
        let res = await colores.get();
        res.forEach(element=>{
            db_arr_colores.push({id:element.id, ...element.data()});
        })
        console.log(db_arr_colores);
        // Eliminar
        // await colores.doc('NoYCKtrWR1LsdWXH5mSO').delete();

        await colores.doc('Ue7MrVF5QKVEJPYFz0Sl').update({nombre:'navy'});
    } catch (error) {
        console.log(error);
    }
})();