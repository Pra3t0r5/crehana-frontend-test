enum Results {
    SI = "SI",
    NO = "NO",
    ERROR = "ERROR"
}

const tickets = (values: number[]): string => {
    const cashRegister = {
        twentyFives: 0,
        fifties: 0,
        hundreds: 0
    }
    for (const value of values) {
        switch (value) {
            case 25:
                cashRegister.twentyFives += 1;
                break;
            case 50:
                if (cashRegister.twentyFives < 1) {
                    return Results.NO;
                }
                cashRegister.fifties += 1;
                cashRegister.twentyFives -= 1;
                break;
            case 100:
                if (cashRegister.fifties >= 1 && cashRegister.twentyFives >= 1) {
                    cashRegister.twentyFives -= 1;
                    cashRegister.fifties -= 1;
                } else if (cashRegister.twentyFives >= 3) {
                    cashRegister.twentyFives -= 3;
                } else {
                    return Results.NO
                }
                cashRegister.hundreds += 1;
                break;
            default:
                console.log(`Error: no se pueden procesar billetes de ${value} dolares. \nReintente con billetes de 25, 50 o 100 dolares.`)
                return Results.ERROR
        }
    }
    return Results.SI
}

console.log(tickets([25, 25, 50]));
console.log(tickets([25, 100]));
console.log(tickets([25, 25, 50, 50, 100]));
console.log(tickets([25, 5]));