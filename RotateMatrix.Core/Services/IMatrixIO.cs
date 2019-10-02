using System.IO;

namespace RotateMatrix.Core.Services
{
    public interface IMatrixIO
    {
        Stream Export(int[,] matrix);
        int[,] Import(Stream stream);
    }
}