import { Container } from "./styles";
import incomeImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"
import totalImg from "../../assets/total.svg"
import React, { useContext } from "react";
import { TransactionsContext, useTransactions } from "../../Hooks/useTransactions";


export function Sumarry(){

    const {transactions} = useTransactions();

    const summary = transactions.reduce((acc, transaction) => {

    if(transaction.type === 'deposit') {
        acc.deposits += transaction.amount;
        acc.total += transaction.amount;
    } else {
        acc.withdraws += transaction.amount;
        acc.total -= transaction.amount;
    }

    return acc;

    }, {
        deposits: 0,
        withdraws: 0,
        total: 0,
    })

    return(
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={ incomeImg } alt="entradas" />
                </header>
                <strong> 
                    {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(summary.deposits)}
                </strong>
                </div>
                <div>
                <header>
                    <p>Saídas</p>
                    <img src={ outcomeImg } alt="saídas" />
                </header>
                <strong> 
                    - 
                    {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(summary.withdraws)}
                </strong>
            </div>
            <div className="highlight">
                <header>
                    <p>Total</p>
                    <img src={ totalImg } alt="total" />
                </header>
                <strong> 
                    {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(summary.total)}
                </strong>
            </div>
        </Container>
    );
}