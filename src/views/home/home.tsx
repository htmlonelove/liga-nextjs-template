'use client'

import {
  FC,
  useState
} from 'react'
import classNames from 'classnames'

import { Button } from '@/ui'
import { Dialog } from '@/components'

import styles from './home.module.scss'
import { HomeProps } from './home.types'

const Home: FC<HomeProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)

  const [isDialogOpened, setIsDialogOpened] = useState(false)

  return <>
    <main className={rootClassName}>
      <Button onClick={() => setIsDialogOpened(true)}>
        Open dialog
      </Button>
    </main>

    {
      isDialogOpened && (
        <Dialog onClose={() => setIsDialogOpened(false)} />
      )
    }
  </>
}

export default Home
