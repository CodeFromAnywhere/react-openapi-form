/**
 * Gets the current word you are typing from a text and the cursor position.
 *
 * Takes into account multiple word separators: tabs, newlines, and spaces.
 */
export const getContext = (editorDetails) => {
    const { positionIndex, text } = editorDetails;
    const wordSeparators = [" ", "\n", "\t"];
    // NB: find the first separator after the word that we are typing at the position of the cursor.
    const firstIndexWithSeparatorAfterPosition = Math.min(...wordSeparators.map((separator) => {
        const separatorAfterPositionIndex = text.indexOf(separator, positionIndex);
        if (separatorAfterPositionIndex === -1)
            return Infinity;
        return separatorAfterPositionIndex;
    }));
    const endOfWordIndex = firstIndexWithSeparatorAfterPosition === Infinity
        ? text.length
        : firstIndexWithSeparatorAfterPosition;
    const lastIndexWithSeparatorBeforePosition = Math.max(...wordSeparators.map((separator) => {
        const spaceBeforePositionIndex = text.slice(0, positionIndex).lastIndexOf(separator) + 1;
        return spaceBeforePositionIndex;
    }));
    const beginningOfWordIndex = lastIndexWithSeparatorBeforePosition === -1
        ? 0
        : lastIndexWithSeparatorBeforePosition;
    const wordAtPosition = text.slice(beginningOfWordIndex, endOfWordIndex);
    /*
      console.log({
        beginningOfWordIndex,
        endOfWordIndex,
        wordAtPosition,
      });
      */
    return {
        wordAtPosition,
        positionIndex,
    };
};
//# sourceMappingURL=getContext.js.map