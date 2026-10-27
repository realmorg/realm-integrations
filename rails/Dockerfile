FROM ruby:4.0-slim
WORKDIR /app
ENV RAILS_ENV=production BUNDLE_WITHOUT=development:test
RUN apt-get update && apt-get install -y --no-install-recommends build-essential libyaml-dev && rm -rf /var/lib/apt/lists/*
COPY Gemfile Gemfile.lock* ./
RUN bundle install
COPY . .
RUN SECRET_KEY_BASE=precompile bin/rails assets:precompile
EXPOSE 8000
CMD ["bin/rails", "server", "-b", "0.0.0.0", "-p", "8000"]
