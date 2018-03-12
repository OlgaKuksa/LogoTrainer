import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const createDocDefinition = (exerciseList, kid) => {
  let exerciseContent = [
    {
      text: kid.firstName + " " + kid.lastName,
      style: "header"
    },
    {
      text:
        exerciseList.length +
        " упр., " +
        "комплекс от " +
        new Date().toLocaleString(),
      style: "italic"
    }
  ];
  let count = 1;
  for (const exercise of exerciseList) {
    exerciseContent.push({
      text: count + ". " + exercise.exerciseName,
      style: "exerciseName"
    });
    exerciseContent.push({
      text: "Инвентарь: ",
      style: "label"
    });
    exerciseContent.push({
      text: exercise.exerciseInventory,
      style: "para"
    });
    exerciseContent.push({
      text: "Методика: ",
      style: "label"
    });
    exerciseContent.push({
      text: exercise.exerciseSteps,
      style: "para"
    });
    count++;
  }

  return {
    content: exerciseContent,
    styles: {
      header: {
        fontSize: 22,
        bold: true,
        alignment: "center"
      },
      exerciseName: {
        fontSize: 18,
        bold: true,
        margin: [10, 10, 10, 0]
      },
      label: {
        leadingIndent: 20,
        fontSize: 14,
        bold: true,
        margin: [0, 5, 0, 0]
      },
      para: {
        fontSize: 14
      },
      italic: {
        fontSize: 14,
        italic: true,
        alignment: "center"
      }
    }
  };
};

export const createPdfForSet = (exerciseList, kid, shouldPrint) => {
  shouldPrint === true
    ? pdfMake.createPdf(createDocDefinition(exerciseList, kid)).print()
    : pdfMake
        .createPdf(createDocDefinition(exerciseList, kid))
        .download(
          kid.firstName + kid.lastName + new Date().toLocaleString() + ".pdf"
        );
};
