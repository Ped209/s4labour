using CoreApi.Infrastructure.ApiClients.Users;
using CoreApi.Infrastructure.Repositories.UserNotes;
using CoreApi.Services.UserNotes;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient<IRandomUserApiClient, RandomUserApiClient>()
    .ConfigureHttpClient(client =>
    {
        client.BaseAddress = new Uri("https://randomuser.me/");
        client.Timeout = TimeSpan.FromSeconds(10);
        client.DefaultRequestHeaders.Accept.Clear();
        client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocal4200", policy =>
    {
        policy.WithOrigins("http://localhost:4200", "https://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Register notes repository and service (in-memory temporary store)
builder.Services.AddSingleton<IUserNotesRepository, InMemoryUserNotesRepository>();
builder.Services.AddScoped<IUserNotesService, UserNotesService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowLocal4200");

app.UseAuthorization();

app.MapControllers();

app.Run();
