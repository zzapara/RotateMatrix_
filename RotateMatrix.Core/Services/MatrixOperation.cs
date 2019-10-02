using System;
using System.Collections.Generic;
using System.Text;

namespace RotateMatrix.Core.Services
{
    public class MatrixOperation : IMatrixOperation
    {
        public int[,] GenerateMatrix(int rank = 2, int minValue = 0, int maxValue = 1000)
        {
            if (rank < 2)
            {
                rank = 2;
            }

            if (rank > 20)
            {
                rank = 20;
            }


            int[,] matrix = new int[rank, rank];
            Random random = new Random();

            for (int indexRow = 0; indexRow < rank; indexRow++)
            {
                for (int indexElement = 0; indexElement < rank; indexElement++)
                {
                    matrix[indexRow, indexElement] = random.Next(minValue, maxValue);
                }
            }
            return matrix;
        }

        public int[,] RotateLeft(int[,] matrix)
        {
            if (IsMatrixSquare(matrix))
            {
                Rotate(matrix, Left);
            }
            else
            {
                matrix = null;
            }
            return matrix;
        }

        public int[,] RotateRight(int[,] matrix)
        {
            if (IsMatrixSquare(matrix))
            {
                Rotate(matrix, Right);
            }
            else
            {
                matrix = null;
            }
            return matrix;
        }

        public bool IsMatrixSquare(int[,] matrix)
        {
            if (matrix.GetLength(0) == matrix.GetLength(1))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        private void Rotate(int[,] matrix, Action<int[,], int, int> sideRotate)
        {
            var rank = matrix.GetLength(0);
            for (int square = 0; square < rank / 2; square++)
            {
                for (int element = square; element < rank - square - 1; element++)
                {
                    sideRotate(matrix, square, element);
                }
            }
        }

        private void Left(int[,] matrix, int square, int element)
        {
            var tempElement = matrix[square, element];
            var rank = matrix.GetLength(0);

            matrix[square, element] = matrix[element, rank - square - 1];
            matrix[element, rank - square - 1] = matrix[rank - square - 1, rank - element - 1];
            matrix[rank - square - 1, rank - element - 1] = matrix[rank - element - 1, square];
            matrix[rank - element - 1, square] = tempElement;
        }

        private void Right(int[,] matrix, int square, int element)
        {
            var tempElement = matrix[square, element];
            var range = matrix.GetLength(0);
            matrix[square, element] = matrix[range - element - 1, square];
            matrix[range - element - 1, square] = matrix[range - square - 1, range - element - 1];
            matrix[range - square - 1, range - element - 1] = matrix[element, range - square - 1];
            matrix[element, range - square - 1] = tempElement;
        }

    }
}
