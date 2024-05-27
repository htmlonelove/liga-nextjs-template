'use client'

import { FC, useState } from 'react'
import Image from 'next/image'
import { Dialog } from '@/components'
import { Button, Heading, Wrapper } from '@/ui'
import classNames from 'classnames'

import styles from './home.module.scss'
import { HomeProps } from './home.types'

const Home: FC<HomeProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)
  const [isDialogOpened, setIsDialogOpened] = useState(false)

  return (
    <main className={rootClassName}>
      <Wrapper>
        <Heading tagName="h1" className={styles.title}>
          Next.js template
        </Heading>
        <Image
          src="./images/sticker-dino.png"
          width={512}
          height={492}
          alt="Ligazavr"
          className={styles.image}
        />

        <Button onClick={() => setIsDialogOpened(true)}>Open dialog</Button>
        {isDialogOpened && <Dialog onClose={() => setIsDialogOpened(false)} />}
      </Wrapper>
    </main>
  )
}

export default Home
