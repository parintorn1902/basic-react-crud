class ArrayUtils {
  static filterAllField(array: any[], filterText: string) {
    return array?.filter((i) => {
      return (
        Object.values(i).filter((j) => {
          return String(j).toLowerCase().includes(filterText.toLowerCase());
        }).length > 0
      );
    });
  }
}

export default ArrayUtils;
