import Link from 'next/link'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BankTabItem } from './BankTabItem'
import BankInfo from './BankInfo'
import TransactionsTable from './TransactionsTable'
import { Pagination } from './Pagination'

const RecentTransactions = ({
  accounts,
  transactions = [],
  appwriteItemId,
  page = 1
}: RecentTransactionsProps) => {
  
  const rowsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / rowsPerPage);

  const indexOfLastTransaction = page * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = transactions.slice(
    indexOfFirstTransaction, indexOfLastTransaction
  );
  return (
    <section className='recent-transactions'>
      <Tabs defaultValue={appwriteItemId} className="w-full shadow-none">
        <TabsList className='recent-transactions-tablist'>
          {accounts.map((account: Account) => (
            <TabsTrigger key={account.id} value={account.appwriteItemId} className="hover:bg-[#EDF1F5]">
              <BankTabItem 
                key={account.id}
                account={account}
                appwriteItemId={appwriteItemId}
              />
            </TabsTrigger>
          ))}
        </TabsList>
        {accounts.map((account: Account) => (
          <TabsContent
            value={account.appwriteItemId}
            key={account.id}
            className='space-y-4'
          >
            <BankInfo
              account={account}
              appwriteItemId={appwriteItemId}
              type='full'
            />

            <TransactionsTable 
              transactions={currentTransactions}
            />

            {totalPages > 1 && (
              <div className='my-4 w-full'>
                <Pagination totalPages={totalPages} page={page}/>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}

export default RecentTransactions