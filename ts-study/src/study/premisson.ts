enum Permission {
  read,
  write,
  delete,
}

let p = Permission.read | Permission.write

/**
 * 判断是否有权限
 * @param tar
 * @param pre
 * @returns
 */
function hasPermission(tar: number, pre: number) {
  return (tar & pre) === pre
}

console.log(hasPermission(p, Permission.delete))

/**
 * 添加权限
 * @param tar
 * @param pre
 * @returns
 */
function addPermission(tar: number, pre: number) {
  if (hasPermission(tar, pre)) return tar
  return tar | pre
}

p = addPermission(p, Permission.delete)

console.log(hasPermission(p, Permission.delete))

/**
 * 删除权限
 * @param tar
 * @param pre
 * @returns
 */
function deletePermission(tar: number, pre: number) {
  if (hasPermission(tar, pre)) {
    return tar ^ pre
  } else {
    return tar
  }
}

p = deletePermission(p, Permission.delete)

console.log(hasPermission(p, Permission.delete))
