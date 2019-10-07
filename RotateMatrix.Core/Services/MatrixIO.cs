using System;
using System.Collections.Generic;
using System.Text;
using System.IO;

namespace RotateMatrix.Core.Services
{
    public class MatrixCSV : IMatrixIO
    {

        public int[,] Import(Stream stream)
        {
            try
            {
                if (stream == null)
                {
                    throw new Exception("Поток читки из файла пуст");
                }
                char[] separators = new char[] { ',', ';' };
                int[,] matrix = null;

                using (var reader = new StreamReader(stream))
                {
                    int indexRow = 0;

                    while (!reader.EndOfStream)
                    {
                        string line = reader.ReadLine();
                        line.Replace(" ", string.Empty);

                        var rowOfElementsStr = line.Split(separators, StringSplitOptions.RemoveEmptyEntries);
                        

                        if (matrix == null)
                        {
                            matrix = new int[rowOfElementsStr.Length, rowOfElementsStr.Length];
                        }

                        if (indexRow > matrix.GetLength(0) - 1 || rowOfElementsStr.Length != matrix.GetLength(0))
                        {
                            throw new Exception("Dimension of matrix are not equal, matrix is not square");
                        }

                        for (int indexOfElement = 0; indexOfElement < matrix.GetLength(0); indexOfElement++)
                        {
                            matrix[indexRow, indexOfElement] = Int32.Parse(rowOfElementsStr[indexOfElement]);
                        }
                        indexRow++;
                    }

                    if (indexRow != matrix.GetLength(0))
                    {
                        throw new Exception("Dimension of matrix are not equal, matrix is not square");
                    }

                }

                return matrix;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Stream Export(int[,] matrix)
        {
            if (matrix == null)
            {
                throw new Exception("Матрица пуста");
            }

            if (matrix.GetLength(0) != matrix.GetLength(1))
            {
                throw new Exception("Dimension of matrix are not equal, matrix is not square");
            }

            MemoryStream memoryStream = new MemoryStream();
            StreamWriter streamWriter = new StreamWriter(memoryStream, Encoding.UTF8);
            StringBuilder stringBuilder = new StringBuilder();

            int rank = matrix.GetLength(0);

            for (int indexRow = 0; indexRow < rank; indexRow++)
            {
                for (int indexElement = 0; indexElement < rank; indexElement++)
                {
                    stringBuilder.Append(matrix[indexRow, indexElement] + ",");
                }
                stringBuilder.Remove(stringBuilder.Length - 1, 1);
                streamWriter.WriteLine(stringBuilder.ToString());
                stringBuilder.Clear();
            }
            streamWriter.Flush();
            memoryStream.Seek(0, SeekOrigin.Begin);

            return memoryStream;
        }
    }
}
