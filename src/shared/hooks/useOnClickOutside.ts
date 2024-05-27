import { useOnClickOutside as libHook } from 'usehooks-ts'

type libHookParams = Parameters<typeof libHook>

const useOnClickOutside = (...params: libHookParams) => libHook(...params)

export default useOnClickOutside
