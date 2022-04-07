export default async (req, res) => {
    const { lower_limit, upper_limit, method } = req.body;

    let result_arr = [];
    let result = 0;
    let cont = 0;
    let contRecursive = 0;
    
    const productRecursive = async (lower_limit, upper_limit, cont, contRecursive) => {
        if(lower_limit > upper_limit) {
            if(contRecursive < result_arr.length) {
                result = contRecursive == 0 ? result_arr[0] : result_arr[contRecursive]*result;
                await productRecursive(lower_limit, upper_limit, cont, contRecursive+1);
            }
        } else {
            result_arr[cont] = (1/lower_limit)+lower_limit;
            await productRecursive(lower_limit+1, upper_limit, cont+1, contRecursive);
        }
    }

    if( lower_limit < 1 )
        return res.status(400).json({error: 'lower_limit min is 1'});

    if( method == 'recursive' ){
        await productRecursive(lower_limit, upper_limit, cont, contRecursive);
    }else if( method == 'iterative' ){
        for (let i = lower_limit; i <= upper_limit; i++) {
            result_arr[cont] = (1/i)+i;
            cont++;
        }
    
        for (let index = 0; index < result_arr.length; index++) {
            result = index == 0 ? result_arr[0] : result_arr[index]*result;
        }
    }else {
        return res.status(400).json({error: 'invalid method'});
    }

    return res.status(201).json({result: result});
};
