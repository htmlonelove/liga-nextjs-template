'use client'

import { FC, useState } from 'react'

import { Button } from '@/ui'
import { Dialog } from '@/components/dialog'

import styles from './home.module.scss'

const Home: FC = () => {
  const [isDialogOpened, setIsDialogOpened] = useState(false)

  return <>
    <div className={styles.root}>
      Home

      <Button onClick={() => setIsDialogOpened(true)}>
        Open dialog
      </Button>
    </div>

    {
      isDialogOpened && (
        <Dialog onClose={() => setIsDialogOpened(false)} />
      )
    }
  </>
}

export default Home
