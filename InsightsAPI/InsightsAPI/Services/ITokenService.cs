using InsightsAPI.Entities;

namespace InsightsAPI.Services
{
    public interface ITokenService
    {
        string Generate(Employee employee);
    }
}
