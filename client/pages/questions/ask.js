import React from 'react';
import Head from 'next/head'

import QuestionAskView from '../../components/question-ask-view'
import Header from '../../components/layout/header'
import QuestionForm from '../../components/question-ask-view/question-form'
import Layout from '../../components/layout'
const Ask = () => {
  return (
    <Layout>
      <Head>
        <title>Ask a Question</title>
      </Head>

      <Header />
      <QuestionAskView>
        <QuestionForm />
      </QuestionAskView>
    </Layout>
  )
}

export default Ask
