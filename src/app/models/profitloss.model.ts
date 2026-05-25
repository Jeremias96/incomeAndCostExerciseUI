import { Cost } from "./cost.model";
import { Income } from "./income.model";

export interface ProfitLoss {
    id: number;
    calculatedProfitOrLoss: number;
    income: Income;
    cost: Cost;
}