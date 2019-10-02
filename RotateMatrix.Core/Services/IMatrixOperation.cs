namespace RotateMatrix.Core.Services
{
    public interface IMatrixOperation
    {
        int[,] GenerateMatrix(int rank = 2, int minValue = 0, int maxValue = 1000);
        bool IsMatrixSquare(int[,] matrix);
        int[,] RotateLeft(int[,] matrix);
        int[,] RotateRight(int[,] matrix);
    }
}